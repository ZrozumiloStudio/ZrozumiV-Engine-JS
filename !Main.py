import os, io, zipfile, json, re, webbrowser
from flask import Flask, request, send_file, render_template_string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

player_settings = {
    "speed": 1.0,
    "rotationSpeed": 0.026,
    "background": "linear-gradient(45deg, #89f, #f89)"
}

default_map = [[1]*30] + [[1]+[0]*28+[1] for _ in range(18)] + [[1]*30]
current_map = [row[:] for row in default_map]

script_dir = os.path.dirname(os.path.abspath(__file__))
engine_path = os.path.join(script_dir, 'ZE', 'Engine.js')
if not os.path.exists(engine_path):
    engine_path = os.path.join(script_dir, 'Engine.js')

if os.path.exists(engine_path):
    with open(engine_path, 'r', encoding='utf-8', errors='ignore') as f:
        original_engine = f.read()
else:
    original_engine = "// Engine.js not found. Please put ZE/Engine.js next to this script.\nvar map = [];// placeholder\n"

html_template = """<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>ZrozumiV Engine Editor</title>
<style>
 body{font-family:sans-serif;padding:20px;background:#eee;}
 #map{display:grid;grid-template-columns:repeat(30,20px);grid-gap:1px;margin-top:10px;}
 .cell{width:20px;height:20px;background:#ccc;cursor:pointer;}
 .wall{background:#333;}
 label{display:block;margin-top:6px}
</style>
</head>
<body>
<h1>ZrozumiV Engine Editor</h1>
<label>Player speed: <input type='number' id='speed' step='0.1' value='{{speed}}'></label>
<label>Rotation speed: <input type='number' id='rotation' step='0.001' value='{{rotation}}'></label>
<label>Background gradient: <input type='text' id='bg' value='{{background}}' style='width:400px'></label>
<div id='map'></div>
<button onclick='save()'>Save & Download ZIP</button>
<script>
const mapData = {{map|tojson}};
const grid=document.getElementById('map');
function render(){grid.innerHTML='';
 for(let y=0;y<mapData.length;y++){
  for(let x=0;x<mapData[0].length;x++){
   let c=document.createElement('div');
   c.className='cell'+(mapData[y][x]?" wall":"");
   c.onclick=()=>{mapData[y][x]=mapData[y][x]?0:1;render();};
   grid.appendChild(c);
  }
 }
}
render();
function save(){
 fetch('/save',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    speed:parseFloat(document.getElementById('speed').value),
    rotation:parseFloat(document.getElementById('rotation').value),
    background:document.getElementById('bg').value,
    map:mapData
  })
 }).then(r=>{
    if(!r.ok) throw new Error('Save failed');
    return r.blob();
 }).then(b=>{
   const url=window.URL.createObjectURL(b);
   const a=document.createElement('a');
   a.href=url;a.download='project.zip';a.click();
 }).catch(e=>alert(e));
}
</script>
</body>
</html>"""

@app.route('/')
def index():
    return render_template_string(html_template,
        speed=player_settings['speed'],
        rotation=player_settings['rotationSpeed'],
        background=player_settings['background'],
        map=current_map)

@app.route('/save', methods=['POST'])
def save():
    data=request.get_json()
    player_settings.update({
        "speed": data.get('speed', player_settings['speed']),
        "rotationSpeed": data.get('rotation', player_settings['rotationSpeed']),
        "background": data.get('background', player_settings['background'])
    })
    global current_map
    current_map = data.get('map', current_map)

    def pretty_map(m):
        lines = []
        for row in m:
            lines.append('  [' + ', '.join(str(int(c)) for c in row) + ']')
        return '[\n' + ',\n'.join(lines) + '\n]'

    engine_mod = original_engine
    engine_mod = re.sub(r"speed\s*:\s*[-+]?[0-9]*\.?[0-9]+", f"speed: {player_settings['speed']}", engine_mod)
    engine_mod = re.sub(r"rotationSpeed\s*:\s*[-+]?[0-9]*\.?[0-9]+", f"rotationSpeed: {player_settings['rotationSpeed']}", engine_mod)
    engine_mod = re.sub(r"(var|let|const)\s+map\s*=\s*\[.*?\];", lambda m: m.group(1) + ' map = ' + pretty_map(current_map) + ';', engine_mod, flags=re.S)
    if engine_mod.strip().startswith('// Engine.js not found'):
        engine_mod = f"// Generated Engine.js placeholder\nvar map = {pretty_map(current_map)};\n// speed: {player_settings['speed']}, rotationSpeed: {player_settings['rotationSpeed']}\n"

    mem = io.BytesIO()
    with zipfile.ZipFile(mem, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('ZE/Engine.js', engine_mod)
        index_html = f"""<html>
  <head><meta charset=\"utf-8\"><title>Game</title></head>
  <body style=\"background:{player_settings['background']}\">
    <canvas id=\"gameCanvas\" width=\"1500\" height=\"600\"></canvas>
    <script src=\"Engine.js\"></script>
  </body>
</html>"""
        z.writestr('ZE/index.html', index_html)
        palm_local = os.path.join(script_dir, 'ZE', 'palm.png')
        if os.path.exists(palm_local):
            z.write(palm_local, 'ZE/palm.png')

    mem.seek(0)
    return send_file(mem, mimetype='application/zip', as_attachment=True, download_name='project.zip')

if __name__ == '__main__':
    webbrowser.open('http://127.0.0.1:5000/')
    app.run(debug=True)

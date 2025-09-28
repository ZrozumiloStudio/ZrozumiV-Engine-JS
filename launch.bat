@echo off
SETLOCAL

python -m ensurepip --upgrade
python -m pip install --upgrade pip

IF EXIST requirements.txt (
    echo Installing libraries...
    python -m pip install -r requirements.txt
) ELSE (
    echo requirements.txt not found
)

IF EXIST !Main.py (
    echo Launching...
    python !main.py
) ELSE (
    echo damn
)

echo Ready
pause

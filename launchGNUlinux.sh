#!/bin/bash
set -e  

python3 -m ensurepip --upgrade
python3 -m pip install --upgrade pip

if [ -f "requirements.txt" ]; then
    echo "Installing libraries..."
    python3 -m pip install -r requirements.txt
else
    echo "requirements.txt not found"
fi

if [ -f "Main.py" ]; then
    echo "Launching..."
    python3 Main.py
else
    echo "damn"
fi

echo "Ready"
read -p "Press Enter to continue..."

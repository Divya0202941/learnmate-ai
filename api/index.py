import sys
from pathlib import Path

# Add backend directory to Python module search path
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.append(str(backend_dir))

from main import app

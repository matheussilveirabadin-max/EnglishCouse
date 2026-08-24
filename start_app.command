#!/bin/bash
cd "$(dirname "$0")"
echo "=================================================="
echo " Starting English for Everyone (Level 2) Study Hub"
echo "=================================================="
open "http://localhost:5173"
npm run preview -- --port 5173

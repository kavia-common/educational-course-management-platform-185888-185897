#!/bin/bash
cd /home/kavia/workspace/code-generation/educational-course-management-platform-185888-185897/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


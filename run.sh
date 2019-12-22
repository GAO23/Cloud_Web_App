#! /bin/bash
cd cloud_drive_backend;
node ./bin/www &
cd ../cloud_drive_front_end;
npm start &
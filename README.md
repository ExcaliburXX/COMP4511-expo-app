# COMP4511 Group Project: Pref'd

## My role
- Worked as half of a two man team on the front-end
- We used React and Expo to develop a mobile app

## Notes
- Backend directory removed for security purposes

## Server

AWS Server is up, see `/api_server/README.md`

The Mongodb server is running online, you do not need to run api_server locally.

## Running the app

First you need to install the frontend requirements:

```bash
cd frontend
npm i # install modules
expo start
```

Open up the Expo app on your mobile device and scan the QR code supplied.

## Encountering errors

If you encounter an error, try the following:

```bash
cd frontend
rm -rf node-modules/ package-lock.json
npm start --reset-cache
```

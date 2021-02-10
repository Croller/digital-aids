# Basic API with server-side authentication

Actually, the authentification hasn't been used so far, it's all open.

All data is stored localy as JSON files under /config/data.

Each table was exported from Google Sheets using the **Export JSON** script (see the top menu).

The next step would be to store them to a DB, a MongoDB most probably, and access from there.

To mount the server, duplicate the .env-example file and rename it to .env, then update to match your settings.


## .env fields
The DB portion doesn't do anything as of now, what is needed is HTTPS_PORT, CORS and PATH_TO... values

Follow the error messages to fill in the values.

- **AUTH_JWT_KEY** : required
- **DB_REMOTE_HOST** : optional (defaults to localhost)
- **DB_REMOTE_PORT** : optional (defaults to 3306)
- **DB_REMOTE_DATABASE** : required
- **DB_REMOTE_USER** : required
- **DB_REMOTE_PASSWORD** : required
- **PATH_TO_PRIVATE_KEY** : required
- **PATH_TO_FULL_CERT** : required
- **HTTPS_PORT** : required
- **CORS** : optional - CORS-enabled servers separated by |  e.g. **CORS=server1.com|server2.com|server3.com**
# Dennis

A module to resolve 3rd party email delegation service for single sign in via oauth.

That's to say, if my email address is remy@example.com and example.com is handled by Gmail, this module will return `google` for the given email, and I can use Google's oAuth for sign in.

## Notes

This is early stage, and far from complete. The intention is to use passportjs for auth, and passwordless pattern for unknown email delegation.

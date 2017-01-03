in mongo db create 

1. create a schema "OAuth"
2. db.users.save({usename:"username",password:"password"});
3. db.clients.save{name:"username", id:"this_is_my_id",secret:"this_is_my_secret",userId:"username"}


step1: hit the auth server with the below url 
	https://localhost:8888/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:300

step2: give credential and give access(username:username, password=password)


step3: will get redirected  to the redirect_uti with acuthorization code in query params.(if not , redirect to the url with error=access_denied)

step4:request for exchange of authorization code to access token+refresh token.

step5: use access token to get user info (use a post request with username(this_is_my_id) and password(this_is_my_secret) as authorization header and in the body pass  code, grnt type, redirect_uri)



Peding implementation:

1. Refresh token linking with access token
2. Access token generation with refresh token+ access token expiry 
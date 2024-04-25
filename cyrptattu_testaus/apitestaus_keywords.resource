*** Variables ***
${Username}     #firstname.lastname@metropolia.fi
${Password}     #password


*** Keywords ***
Authenticate as Admin
    ${body}    Create Dictionary   username=${Username}     password=${Password}
    ${response}    POST   url=http://127.0.0.1:3000/api/auth/login   json=${body}
    Log    ${response.json()}
    ${token}    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}


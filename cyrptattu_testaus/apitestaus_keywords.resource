*** Variables ***
${Username}     #firstname.lastname@metropolia.fi
${Password}     #password


*** Keywords ***
Authenticate as Admin
    ${body}    Create Dictionary   username=${Username}     password=${Password}
    ${response}    POST   url=https://hyte-server-aura.northeurope.cloudapp.azure.com/api/auth/login   json=${body}
    Log    ${response.json()}
    ${token}    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}


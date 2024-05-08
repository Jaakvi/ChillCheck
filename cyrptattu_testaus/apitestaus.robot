*** Settings ***
Library    RequestsLibrary
Library    Collections
Library     Browser    auto_closing_level=SUITE
Library     CryptoLibrary    variable_decryption=True
Resource    apitestaus_keywords.resource
Suite Setup    Authenticate as Admin

*** Variables ***
${username}    crypt:pIcv12T6btCUZ+VWz7pxlHLyDNkSs8zWhGErOaSSQkukg58vWJbtFQ+KsEpjiOmdqafA9V6e7+7teUjp+xpBk/8Tu+BsaisdQiVshwM=
${password}    crypt:HiTIN2ydkeIFjKtTJYNzEHH+Q5+ybjwiyL8VatPWUVvxDgFVJc60/QSPrnOXI4Y9QGE8l/lHsbGNYSO1


*** Test Cases ***
# Get Bookings from Restful Booker
#     ${body}    Create Dictionary    firstname=John
#     ${response}    GET    https://restful-booker.herokuapp.com/booking    ${body}
#     Status Should Be    200
#     Log List    ${response.json()}
#     FOR  ${booking}  IN  @{response.json()}
#         ${response}    GET    https://restful-booker.herokuapp.com/booking/${booking}[bookingid]
#         TRY
#             Log    ${response.json()}
#         EXCEPT
#             Log    Cannot retrieve JSON due to invalid data
#         END
#     END

Get user info
    ${headers}=   Create Dictionary   Authorization=Bearer ${token} 
    ${response}    GET   https://hyte-server-aura.northeurope.cloudapp.azure.com/api/kubios/user-info  headers=${headers}
    Log    ${response.json()}   
    Status Should Be    200 
    
     
# login user to restapi 
#     ${headers}=   Create Dictionary  
#     ${response}    POST   http://hyte-server-aura.northeurope.cloudapp.azure.com/api/auth/login  headers=${headers}
#     Log    ${response.json()}   
#     Status Should Be    200 


Get User heartrate data
    ${headers}=     Create Dictionary    Authorization=Bearer ${token} 
    ${response}   GET     https://hyte-server-aura.northeurope.cloudapp.azure.com/api/kubios/user-data   headers=${headers} 
    Log     ${response.json()} 
    Status Should Be     200






# Delete Booking
#     ${header}    Create Dictionary    Cookie=token\=${token}
#     ${response}    DELETE    url=https://restful-booker.herokuapp.com/booking/${id}    headers=${header}   
#     Status Should Be    201    ${response}
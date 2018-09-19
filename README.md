ref: https://github.com/ubahnverleih/WoBike

#LIME
get Lime to text you a 6 digit code to your phone
GET (in browser) https://web-production.lime.bike/api/rider/v1/login?phone=9193893777

use that code to post data (see postman lime collection)
also turn on Postman interceptor to get cookie code
POST - https://web-production.lime.bike/api/rider/v1/login
{"login_code": "156242", "phone": "9193893777"}

Cookie can be from different post using different code if needed


GET - https://web-production.lime.bike/api/rider/v1/views/main?map_center_latitude=35.787743&map_center_longitude=-78.644257&user_latitude=35.787743&user_longitude=-78.644257
Cookie: _limebike-web_session=dFRzWFYxUkh1TGNCL0cxb2RTUUVkb1k3blJSRzZhTk9wcmt3dS9tVTQwcjNVendudHpjeXJFUlRONmJxd2R2YTRLNlhOSFVZWjkzbUZPUFFvV0w3aVJTNXhDRHJncU92TWFWZHMvWjFNQ1NVZHM0bnlldHN1bFNyYUYwVUlpWU1JOFlaZ3ppekhCNGxoT3EwMmZkMGlUNXFyS1d3eWhJN0E2aG01WERnUFNGVFg0Z0pTOC9iZ0hGTmNNMjk4T1R4MFIvTFdIaXhneWE0R0NIMnJHSEdvL0Y3SFhWb09vcCtDTWMwNkNYVDNwazFxaDhxcUVYU0FpQTFCOG5ZQUVPQ3NYNWtYek04REZ5dVRyN0xESXNEcFY4V2ErOWJOT2dIcTBmTE5UZ0FNaHJQWjhhd2dyaVlkMWFqMWU5S1gveGpmUEIrSGJuL0FSTVVGd01TZ0lEeWhBd0s0Ym50YXdvWVhLVDdNUlVVMjNNTTROQ05mbG9FUk9MemJGQjA4OXpQRTM0NDJvU2Z2STNxcDVQblNaNWZldz09LS0rWkEvQ1dQL0ticy9nZmhTeW5FSHlRPT0%3D--abfe81b6942719f361d47d7836ed7c64a60e28c8
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiTUg3Q1ZXM0dRSUIyUSIsImxvZ2luX2NvdW50Ijo1fQ.9gFB7mDHq3IKo-aW6WZvTICeXVKwlQ0WGkRNknqd8jE


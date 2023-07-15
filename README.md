# LineString-Intersection
LineString-Intersection using Nodejs Express.
# REST API 
 
API to calculate the intersections.

## Install Packages

    npm install

## Run the app

    nodemon server.js

## Run the eslint to check for the errors

    npx eslint server.js

# REST API

The REST API

## Get Intersections

### Request

`POST /intersections`

    curl --location --request POST 'http://localhost:2000/api/intersections' \
        --header 'Authorization: Bearer your-auth-token' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "type": "LineString",
            "coordinates": [
                [
                    -96.79512,
                    32.77823
                ],
                [
                    -96.79469,
                    32.77832
                ],
                [
                    -96.79433,
                    32.77728
                ],
                [
                    -96.79424,
                    32.77715
                ],
                ......
            ]
        }'


### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Jul 2023 10:16:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 206

    [
        {
            "id": "L02",
            "intersection": [
                -74.061602,
                40.705933
            ]
        },
        {
            "id": "L04",
            "intersection": [
                -99.311072,
                19.488246
            ]
        },
        {
            "id": "L05",
            "intersection": [
                -99.311072,
                19.488246
            ]
        },
        {
            "id": "L06",
            "intersection": [
                -102.829608,
                23.177846
            ]
        }
    ]

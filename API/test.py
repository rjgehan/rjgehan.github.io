import requests

def main():
    try:
        api_key = "6467501de168494c97c7a9b00aa2653e"  # Replace with your API key
        url = "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/4255171531/"

        headers = {
            "X-API-Key": api_key
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code

        data = response.json()  # Parse JSON response into a dictionary

        # Access 'Sockets' key from the JSON response
        sockets = data['Response']['sockets']['socketEntries']
        print('Perks for: ' + data['Response']['displayProperties']['name'])
        
        for i in sockets:
            
            socketTypeHash = i['socketTypeHash']
            singleInitialItemHash = i['singleInitialItemHash']
                        
            url = "https://www.bungie.net/Platform/Destiny2/Manifest/DestinySocketTypeDefinition/" + str(socketTypeHash) + "/"
            response2 = requests.get(url, headers=headers)
            response2.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
            data2 = response2.json()
            print('-------------------------------------')
            print(data2['Response']['plugWhitelist'][0]['categoryIdentifier'])
            try:
                randomizedPlugSetHash = i['randomizedPlugSetHash']
            except:
                randomizedPlugSetHash = 'none'
            if randomizedPlugSetHash != 'none':
                url = "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyPlugSetDefinition/" + str(randomizedPlugSetHash) + "/"
                response2 = requests.get(url, headers=headers)
                response2.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
                data2 = response2.json()
                reusablePlugItems = data2['Response']['reusablePlugItems']
                for j in reusablePlugItems:
                    plugItemHash = j['plugItemHash']
                    url = "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/" + str(plugItemHash) + "/"
                    response3 = requests.get(url, headers=headers)
                    response3.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
                    data3 = response3.json()
                    print(data3['Response']['displayProperties']['name'])
                    
            

    except requests.RequestException as e:
        print(e)

if __name__ == "__main__":
    main()

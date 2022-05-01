import requests 
import json
import time

from parserconfig import VK_TOKEN

UNIVER_CHANNELS = [
    {'id': '72742235',
    'univer': 'IITU',
    'url': 'https://vk.com/iitukz',
    'last_post_id': 0},
]

VK_API_VERSION = '5.131'

def main():
    #REQUEST_COUNT = 0
    REQUEST_COUNT = 4998

    for chan in UNIVER_CHANNELS:
        offset = 0

        last_post_id = -1

        # FIRST REQUEST

        r_url = f'https://api.vk.com/method/wall.get?access_token={ VK_TOKEN }&owner_id=-{ chan["id"] }&offset={ offset * 100 }&count=100&v={ VK_API_VERSION }'
        r = requests.get(r_url)

        data = json.loads(r.text)['response']
        posts_count = data['count']
        offset = 100

        if data['items'][0]['id'] <= chan['last_post_id']:
            continue

        for post in data['items']:
            if post['id'] <= chan['last_post_id']:
                break

            paragraphs = post['text'].split('\n')
            requests.post('http://127.0.0.1:8000/post/all/', json = {'title': 'VK POST ' + str(post['id']), 
                                                                                    'original_url': chan['url'], 
                                                                                    'paragraphs': paragraphs
                                                                                    }
                                                )

        time.sleep(0.34)

        while REQUEST_COUNT < 5000:
            r_url = f'https://api.vk.com/method/wall.get?access_token={ VK_TOKEN }&owner_id=-{ chan["id"] }&offset={ offset }&count=100&v={ VK_API_VERSION }'
            r = requests.get(r_url)
            
            REQUEST_COUNT += 1
            offset += 100

            data = json.loads(r.text)['response']

            if data['items'][0]['id'] <= chan['last_post_id']:
                break

            for post in data['items']:
                if post['id'] <= chan['last_post_id']:
                    break

                paragraphs = post['text'].split('\n')
                requests.post('http://127.0.0.1:8000/post/all/', json = {'title': 'VK POST ' + str(post['id']), 
                                                                                        'original_url': chan['url'], 
                                                                                        'paragraphs': paragraphs
                                                                                        }
                                                    )

            if posts_count >= offset:
                break
                    
            time.sleep(0.34)

if __name__ == '__main__':
    main()
    
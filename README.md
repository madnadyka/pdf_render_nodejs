HTML to PDF create tool (nodejs, puppeteer) in docker container.

Example of usage:

CURL:
```
curl --request GET \
    --url http://localhost:3000/pdf_render?uri=https://google.com \
    --header 'Content-Type: multipart/form-data' \
    -o result.pdf
```    
Python 3:
```    
async def render_pdf():
    url = 'http://localhost:3000/pdf_render?uri=https://google.com
    headers = {'Content - Type': 'multipart/form-data'}
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.get(url,timeout=10000)as response:
             content = await response.read()
    outputFilename = 'result.pdf'
    file = open(outputFilename, "wb")
    file.write(content)
    file.close()
```
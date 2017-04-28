from os.path import basename
from urllib.parse import urlparse

from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule

from ..items import UbuItem


class OutsidersSpider(CrawlSpider):
    name = 'outsiders'
    allowed_domains = ['www.ubu.com']
    start_urls = ['http://www.ubu.com/outsiders/ass/']

    rules = (
        Rule(LinkExtractor(allow=(), deny_extensions=['html']), callback='parse_item'),
    )

    def parse_item(self, response):

        url = urlparse(response.url)
        filename = basename(url.path)

        content_type = response.headers.get('Content-Type')

        yield UbuItem(
                category='outsiders',
                filename=filename,
                content_type=content_type,
                content=response.body)

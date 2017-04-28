from scrapy import Field, Item


class UbuItem(Item):
    category = Field()
    filename = Field()
    content_type = Field()
    content = Field()

from mimetypes import types_map
from os import mkdir
from os.path import expanduser, join

from scrapy.exceptions import DropItem

MIME_TYPES = set(types_map.values())


class UbuPipeline(object):
    def process_item(self, item, spider):
        return item


class ValidateContentTypePipeline(object):

    def process_item(self, item, spider):
        if item['content_type'] and item['content_type'].decode('utf-8') in MIME_TYPES:
            return item
        raise DropItem('Bad Content-Type encountered: %s' % item)


class FileExporterPipeline(object):

    @classmethod
    def from_crawler(cls, crawler):
        export_directory = expanduser(crawler.settings.get('EXPORT_DIRECTORY'))
        return cls(export_directory=export_directory)

    def __init__(self, export_directory):
        self.export_directory = export_directory
        self.created_categories = set()

    def open_spider(self, spider):
        # make sure the export directory exists
        try:
            mkdir(self.export_directory)
        except OSError:
            pass

    def process_item(self, item, spider):

        category_directory = join(self.export_directory, item['category'])

        # make sure the category directory exists
        if not item['category'] in self.created_categories:
            try:
                mkdir(category_directory)
                self.created_categories.add(item['category'])
            except OSError:
                pass

        # write the item content out to file
        with open(join(category_directory, item['filename']), 'wb') as f:
            f.write(item['content'])
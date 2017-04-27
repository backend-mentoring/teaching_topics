from mimetypes import types_map
from os import mkdir
from os.path import join

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

    def __init__(self, export_directory):
        self.export_directory = export_directory
        self.created_categories = set()

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            export_directory=crawler.settings.get('EXPORT_DIRECTORY'),
        )

    def process_item(self, item, spider):

        category_directory = join(self.export_directory, item['category'])

        # create a directory for this category
        if not item['category'] in self.created_categories:
            try:
                mkdir(category_directory)
            except FileExistsError:
                pass

        with open(join(category_directory, item['filename']), 'wb') as f:
            f.write(item['content'])

BOT_NAME = 'ubu'

EXPORT_DIRECTORY = '~/Downloads/ubu'

SPIDER_MODULES = ['ubu.spiders']
NEWSPIDER_MODULE = 'ubu.spiders'

ROBOTSTXT_OBEY = True

ITEM_PIPELINES = {
    'ubu.pipelines.ValidateContentTypePipeline': 300,
    'ubu.pipelines.FileExporterPipeline': 500,
}

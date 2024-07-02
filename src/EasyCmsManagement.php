<?php declare(strict_types=1);

    namespace CodeTech\EasyCmsManagement;

    use Shopware\Core\Framework\Plugin;
    use Shopware\Core\Framework\Plugin\Context\InstallContext;
    use Shopware\Core\System\CustomField\CustomFieldTypes;
    use Shopware\Core\Framework\Context;
    use Shopware\Core\Framework\Uuid\Uuid;
    use Shopware\Core\System\SalesChannel\SalesChannelDefinition;
    use Shopware\Core\System\User\UserDefinition;

    class EasyCmsManagement extends Plugin
    {
        const CUSTOM_FIELDSET_ID = '019072c8813e723599de652b504b50fb';

        const FIELDSET_NAME = 'ct_easy_cms_management';

        public function install(InstallContext $context): void
        {

            parent::install($context);

            $this->addCustomFields($context->getContext());
        }

        public function update(Plugin\Context\UpdateContext $context): void
        {
            parent::update($context);

            $this->addCustomFields($context);
        }


        public function addCustomFields(Context $context)
        {
            $customFieldsRepository = $this->container->get('custom_field_set.repository');

            $customFieldsRepository->upsert([
                [
                    'id'           => self::CUSTOM_FIELDSET_ID,
                    'name'         => self::FIELDSET_NAME,
                    'config'       => [
                        'label' => [
                            'en-GB' => 'Easy CMS Management',
                            'de-DE' => 'Easy CMS Management'
                        ]
                    ],
                    'customFields' => [
                        [
                            'id'     => Uuid::randomHex(),
                            'name'   => $this->getCustomFieldName('show_easy_cms_management_toolbar'),
                            'type'   => CustomFieldTypes::SWITCH,
                            'config' => [
                                'customFieldPosition' => 1,
                                'label'               => [
                                    'en-GB' => 'Show Easy CMS Management Toolbar',
                                    'de-DE' => 'Show Easy CMS Management Toolbar'
                                ]
                            ]
                        ]
                    ],
                    'relations'    => [
                        [
                            'id'         => strtolower(self::CUSTOM_FIELDSET_ID),
                            'entityName' => $this->container->get(UserDefinition::class)->getEntityName()
                        ]
                    ]
                ]
            ], $context);
        }

        protected function getCustomFieldName(string $name): string
        {
            return self::FIELDSET_NAME . '_' . $name;
        }
    }
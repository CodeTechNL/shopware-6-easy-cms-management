import template from './sw-user-management.html.twig';

const {Component, Context} = Shopware;
const {Criteria} = Shopware.Data;
Shopware.Component.override('sw-users-permissions-user-detail', {
    template,
    inject: [
        'userService',
        'repositoryFactory'
    ],
    computed: {
        customerRepository() {
            return this.repositoryFactory.create('customer');
        },
    },
    watch: {
        user(user) {
            this.currentCustomerId = user?.customFields?.easy_cms_management;
        }
    },
    data() {
        return {
            currentCustomerId: null,
            selectedCustomerId: null,
        }
    },
    methods: {
        updateCurrentUser() {
            return this.userService.getUser().then((response) => {
                const data = response.data;
                delete data.password;

                return Shopware.State.commit('setCurrentUser', data);
            });
        },


        initCustomField() {
            if (!this.userData.customFields) {
                this.userData.customFields = {};
            }

            if (!this.userData.customFields.easy_cms_management) {
                this.userData.customFields.easy_cms_management = null;
            }
        },
        handleUserAccount(newCustomerId, oldCustomerId) {

            if (newCustomerId) {
                this.searchCustomer(newCustomerId)
                    .then(response => {
                        this.enableCmsManagementToolbar(response[0])
                    })
            }

            if (oldCustomerId) {
                this.searchCustomer(oldCustomerId)
                    .then(response => {
                        this.disableCmsManagementToolbar(response[0])
                        console.log('Disabling!');
                    })
            }
        },
        async searchCustomer(customerId) {
            let criteria = new Criteria;

            criteria.addFilter(Criteria.equals('id', customerId));

            return await this.customerRepository.search(criteria)
                .then(response => response[0]);
        },
        enableCmsManagementToolbar(customer) {
            if (!customer.customFields) {
                customer.customFields = {};
            }
            customer.customFields.ct_easy_cms_management_toolbar_enabled = true;

            this.customerRepository.save(customer, Shopware.Context.api)
        },
        disableCmsManagementToolbar(customer) {
            if (customer.customFields && customer.customFields.ct_easy_cms_management_toolbar_enabled) {
                delete customer.customFields.ct_easy_cms_management_toolbar_enabled;

                this.customerRepository.save(customer, Shopware.Context.api)
            }
        },
    },
    mounted() {
        let user =  this.searchCustomer('019072ea003e7791a1a1e73660d2f18c');

        console.log(user)
    }
});

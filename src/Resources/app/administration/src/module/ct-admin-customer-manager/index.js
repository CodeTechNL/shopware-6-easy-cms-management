import template from './ct-admin-customer-manager.html.twig';
// const context = { ...Shopware.Context.api, ...{ languageId } };

const {Component, Context} = Shopware;
const {Criteria} = Shopware.Data;
// Shopware.Context.app.config.version;
Component.register('ct-admin-customer-manager', {
    template,
    inject: [
        'repositoryFactory'
    ],
    props: {
        user: {}
    },
    computed: {
        customerRepository() {
            return this.repositoryFactory.create('customer');
        },
    },

    watch: {
        user(newData){
            // this.handleUserAccount(newData?.customFields?.easy_cms_management, this.currentCustomerId)
        },
    },
    data() {
        return {
            currentCustomerId: this.user?.customFields?.easy_cms_management,
            userData: this.user,
            customer: {}
        }
    },
    methods: {

    }
});
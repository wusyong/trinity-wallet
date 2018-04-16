const { ipcRenderer: ipc, shell, clipboard } = require('electron');
const packageFile = require('../package.json');
const machineUuid = require('machine-uuid');
const keytar = require('keytar');
const settings = require('electron-settings');

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const Electron = {
    clipboard: (content) => {
        if (content.length > 0) {
            clipboard.writeText(content);
        } else {
            clipboard.clear();
        }
    },

    getUuid() {
        return machineUuid();
    },

    gotoLatestRelease: () => {
        shell.openExternal(packageFile.url);
    },

    updateMenu: (attribute, value) => {
        ipc.send('menu.update', {
            attribute: attribute,
            value: value,
        });
    },

    requestDeepLink: () => {
        ipc.send('request.deepLink');
    },

    updateSettings: (attribute, value) => {
        ipc.send('settings.update', {
            attribute: attribute,
            value: value,
        });
    },

    getActiveVersion() {
        return settings.get('trinity-version');
    },

    setActiveVersion(value) {
        return settings.set('trinity-version', value);
    },

    getStorage(key) {
        return settings.get(`persist-${key}`);
    },

    setStorage(key, item) {
        return settings.set(`persist-${key}`, item);
    },

    removeStorage(key) {
        return settings.delete(`persist-${key}`);
    },

    clearStorage() {
        const keys = this.getAllStorage();
        keys.forEach((key) => this.removeStorage(key));
    },

    getAllStorage() {
        const data = settings.getAll();
        const keys = Object.keys(data)
            .filter((key) => key.indexOf('persist-') === 0)
            .map((key) => key.replace('persist-', ''));
        return keys;
    },

    readKeychain: () => {
        return keytar.getPassword('Trinity desktop wallet', 'trinity');
    },

    setKeychain: (content) => {
        return keytar.setPassword('Trinity desktop wallet', 'trinity', content);
    },

    getOS: () => {
        return process.platform;
    },

    changeLanguage: (t) => {
        ipc.send('menu.language', {
            about: t('settings:about'),
            checkUpdate: t('checkForUpdates'),
            sendFeedback: 'Send feedback',
            settings: capitalize(t('home:settings')),
            accountSettings: t('settings:accountManagement'),
            newAccount: t('accountManagement:addNewAccount'),
            language: t('languageSetup:language'),
            node: t('node'),
            currency: t('settings:currency'),
            theme: t('settings:theme'),
            twoFA: t('settings:twoFA'),
            changePassword: t('settings:changePassword'),
            advanced: t('settings:advanced'),
            hide: t('settings:hide'),
            hideOthers: t('settings:hideOthers'),
            showAll: t('settings:showAll'),
            quit: t('settings:quit'),
            edit: t('settings:edit'),
            undo: t('settings:undo'),
            redo: t('settings:redo'),
            cut: t('settings:cut'),
            copy: t('settings:copy'),
            paste: t('settings:paste'),
            selectAll: t('settings:selectAll'),
            account: t('account'),
            balance: capitalize(t('home:balance')),
            send: capitalize(t('home:send')),
            receive: capitalize(t('home:receive')),
            history: capitalize(t('home:history')),
            logout: t('settings:logout'),
            logoutConfirm: t('logoutConfirmationModal:logoutConfirmation'),
            yes: t('yes'),
            no: t('no'),
        });
    },

    onEvent: function(event, callback) {
        let listeners = this._eventListeners[event];
        if (!listeners) {
            listeners = this._eventListeners[event] = [];
            ipc.on(event, (e, args) => {
                listeners.forEach((call) => {
                    call(args);
                });
            });
        }
        listeners.push(callback);
    },

    removeEvent: function(event, callback) {
        const listeners = this._eventListeners[event];
        listeners.forEach((call, index) => {
            if (call === callback) {
                listeners.splice(index, 1);
            }
        });
    },

    _eventListeners: {},
};

global.Electron = Electron;

import { ActionTypes as SettingsActionTypes } from '../actions/settings';
import { ActionTypes as UiActionTypes } from '../actions/ui';
import { ActionTypes as TransfersActionTypes } from '../actions/transfers';
import { ActionTypes as WalletActionTypes } from '../actions/wallet';
import { ActionTypes as AccountsActionTypes } from '../actions/accounts';
import { ActionTypes as PollingActionTypes } from '../actions/polling';

const initialState = {
    isGeneratingReceiveAddress: false,
    isFetchingCurrencyData: false,
    hasErrorFetchingCurrencyData: false,
    isBroadcastingBundle: false,
    isPromotingTransaction: false,
    isTransitioning: false,
    isAttachingToTangle: false,
    isFetchingLatestAccountInfoOnLogin: false,
    hasErrorFetchingAccountInfoOnLogin: false,
    isSendingTransfer: false,
    isSyncing: false,
    inactive: false,
    minimised: false,
    sendAddressFieldText: '',
    sendAmountFieldText: '',
    sendMessageFieldText: '',
    loginPasswordFieldText: '',
    sendDenomination: 'i',
    onboarding: {
        name: '',
        seed: null,
        isGenerated: false,
    },
    doNotMinimise: false,
    isModalActive: false,
    isCheckingCustomNode: false,
    isChangingNode: false,
    currentlyPromotingBundleHash: '',
    loginRoute: 'login',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SettingsActionTypes.CURRENCY_DATA_FETCH_REQUEST:
            return {
                ...state,
                isFetchingCurrencyData: true,
                hasErrorFetchingCurrencyData: false,
            };
        case SettingsActionTypes.CURRENCY_DATA_FETCH_SUCCESS:
            return {
                ...state,
                isFetchingCurrencyData: false,
            };
        case SettingsActionTypes.CURRENCY_DATA_FETCH_ERROR:
            return {
                ...state,
                isFetchingCurrencyData: false,
                hasErrorFetchingCurrencyData: true,
            };
        case UiActionTypes.SET_LOGIN_PASSWORD_FIELD:
            return {
                ...state,
                loginPasswordFieldText: action.payload,
            };
        case UiActionTypes.SET_SEND_ADDRESS_FIELD:
            return {
                ...state,
                sendAddressFieldText: action.payload,
            };
        case UiActionTypes.SET_SEND_AMOUNT_FIELD:
            return {
                ...state,
                sendAmountFieldText: action.payload,
            };
        case UiActionTypes.SET_SEND_MESSAGE_FIELD:
            return {
                ...state,
                sendMessageFieldText: action.payload,
            };
        case UiActionTypes.CLEAR_SEND_FIELDS:
            return {
                ...state,
                sendAddressFieldText: '',
                sendAmountFieldText: '',
                sendMessageFieldText: '',
            };
        case WalletActionTypes.SET_DEEP_LINK:
            return {
                ...state,
                sendAddressFieldText: action.address,
                sendAmountFieldText: action.amount,
                sendMessageFieldText: action.message,
            };
        case UiActionTypes.SET_SEND_DENOMINATION:
            return {
                ...state,
                sendDenomination: action.payload,
            };
        case TransfersActionTypes.BROADCAST_BUNDLE_REQUEST:
            return {
                ...state,
                isBroadcastingBundle: true,
            };
        case TransfersActionTypes.BROADCAST_BUNDLE_SUCCESS:
        case TransfersActionTypes.BROADCAST_BUNDLE_ERROR:
            return {
                ...state,
                isBroadcastingBundle: false,
            };
        case TransfersActionTypes.PROMOTE_TRANSACTION_REQUEST:
            return {
                ...state,
                isPromotingTransaction: true,
                currentlyPromotingBundleHash: action.payload,
            };
        case PollingActionTypes.PROMOTE_TRANSACTION_REQUEST:
            return {
                ...state,
                currentlyPromotingBundleHash: action.payload,
            };
        case PollingActionTypes.PROMOTE_TRANSACTION_SUCCESS:
        case PollingActionTypes.PROMOTE_TRANSACTION_ERROR:
        case TransfersActionTypes.PROMOTE_TRANSACTION_SUCCESS:
        case TransfersActionTypes.PROMOTE_TRANSACTION_ERROR:
            return {
                ...state,
                isPromotingTransaction: false,
                currentlyPromotingBundleHash: '',
            };
        case UiActionTypes.SET_USER_ACTIVITY:
            return {
                ...state,
                ...action.payload,
            };
        case WalletActionTypes.GENERATE_NEW_ADDRESS_REQUEST:
            return {
                ...state,
                isGeneratingReceiveAddress: true,
            };
        case WalletActionTypes.GENERATE_NEW_ADDRESS_ERROR:
        case WalletActionTypes.GENERATE_NEW_ADDRESS_SUCCESS:
            return {
                ...state,
                isGeneratingReceiveAddress: false,
            };
        case TransfersActionTypes.SEND_TRANSFER_REQUEST:
            return {
                ...state,
                isSendingTransfer: true,
            };
        case TransfersActionTypes.SEND_TRANSFER_SUCCESS:
        case TransfersActionTypes.SEND_TRANSFER_ERROR:
            return {
                ...state,
                isSendingTransfer: false,
            };
        case WalletActionTypes.CLEAR_WALLET_DATA:
            return {
                ...state,
                isGeneratingReceiveAddress: false,
                isFetchingCurrencyData: false,
                hasErrorFetchingCurrencyData: false,
                isBroadcastingBundle: false,
                isPromotingTransaction: false,
                isTransitioning: false,
                isAttachingToTangle: false,
                isFetchingLatestAccountInfoOnLogin: false,
                hasErrorFetchingAccountInfoOnLogin: false,
                isSendingTransfer: false,
                isSyncing: false,
                inactive: false,
                minimised: false,
                sendAddressFieldText: '',
                sendAmountFieldText: '',
                sendMessageFieldText: '',
                loginPasswordFieldText: '',
                sendDenomination: 'i',
                onboarding: {
                    name: '',
                    seed: null,
                    isGenerated: false,
                },
                doNotMinimise: false,
                isModalActive: false,
            };
        case AccountsActionTypes.FULL_ACCOUNT_INFO_FIRST_SEED_FETCH_REQUEST:
            return {
                ...state,
                isFetchingLatestAccountInfoOnLogin: true,
                hasErrorFetchingAccountInfoOnLogin: false,
            };
        case AccountsActionTypes.FULL_ACCOUNT_INFO_FIRST_SEED_FETCH_ERROR:
            return {
                ...state,
                isFetchingLatestAccountInfoOnLogin: false,
                hasErrorFetchingAccountInfoOnLogin: true,
            };
        case AccountsActionTypes.FULL_ACCOUNT_INFO_FIRST_SEED_FETCH_SUCCESS:
            return {
                ...state,
                isFetchingLatestAccountInfoOnLogin: false,
            };
        case AccountsActionTypes.ACCOUNT_INFO_FETCH_REQUEST:
            return {
                ...state,
                isFetchingLatestAccountInfoOnLogin: true,
            };
        case AccountsActionTypes.ACCOUNT_INFO_FETCH_SUCCESS:
        case AccountsActionTypes.ACCOUNT_INFO_FETCH_ERROR:
            return {
                ...state,
                isFetchingLatestAccountInfoOnLogin: false,
            };
        case AccountsActionTypes.MANUAL_SYNC_REQUEST:
            return {
                ...state,
                isSyncing: true,
            };
        case AccountsActionTypes.MANUAL_SYNC_SUCCESS:
        case AccountsActionTypes.MANUAL_SYNC_ERROR:
            return {
                ...state,
                isSyncing: false,
            };
        case WalletActionTypes.SNAPSHOT_TRANSITION_REQUEST:
            return {
                ...state,
                isTransitioning: true,
            };
        case WalletActionTypes.SNAPSHOT_TRANSITION_SUCCESS:
            return {
                ...state,
                isTransitioning: false,
            };
        case WalletActionTypes.SNAPSHOT_TRANSITION_ERROR:
            return {
                ...state,
                isTransitioning: false,
            };
        case WalletActionTypes.SNAPSHOT_ATTACH_TO_TANGLE_REQUEST:
            return {
                ...state,
                isAttachingToTangle: true,
            };
        case WalletActionTypes.SNAPSHOT_ATTACH_TO_TANGLE_COMPLETE:
            return {
                ...state,
                isAttachingToTangle: false,
            };
        case UiActionTypes.SET_ONBOARDING_SEED:
            return {
                ...state,
                onboarding: Object.assign({}, state.onboarding, action.payload),
            };
        case UiActionTypes.SET_ONBOARDING_NAME:
            return {
                ...state,
                onboarding: Object.assign({}, state.onboarding, { name: action.payload }),
            };
        case UiActionTypes.SET_DO_NOT_MINIMISE:
            return {
                ...state,
                doNotMinimise: action.payload,
            };
        case UiActionTypes.TOGGLE_MODAL_ACTIVITY:
            return {
                ...state,
                isModalActive: !state.isModalActive,
            };
        case UiActionTypes.SET_CUSTOM_NODE_CHECK_STATUS:
            return {
                ...state,
                isCheckingCustomNode: action.payload,
            };
        case SettingsActionTypes.SET_NODE_REQUEST:
            return {
                ...state,
                isChangingNode: true,
            };
        case SettingsActionTypes.SET_NODE:
        case SettingsActionTypes.SET_NODE_AND_CHANGE_TO_LOCAL_POW:
            return {
                ...state,
                isChangingNode: false,
                hasGeneratedAutopromotionAlert: false,
            };
        case SettingsActionTypes.SET_NODE_ERROR:
            return {
                ...state,
                isChangingNode: false,
            };
        case UiActionTypes.SET_LOGIN_ROUTE:
            return {
                ...state,
                loginRoute: action.payload,
            };
        case PollingActionTypes.SET_AUTOPROMOTION_ALERT_FLAG:
            return {
                ...state,
                hasGeneratedAutopromotionAlert: action.payload,
            };
        default:
            return state;
    }
};

// import ReactNative from 'react-native';
// import I18n from 'react-native-i18n';

// I18n.fallbacks = false;

// I18n.translations = {
//     'en': require('./en.json'),
//     'vi': require('./vi.json')
// }
// export default I18n;
import I18n, { getLanguages } from 'react-native-i18n';
import { setData, getData } from '../services/data.service'
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// I18n.defaultLocale = 'en-US',

I18n.translations = {
    en: require('./en.json'),
    vi: require('./vi.json'),
    ko: require('./ko.json'),
    zh: require('./zh.json'),
    pt: require('./pt.json')
};

// I18n.locale = 'en';



export const ListLanguage = [
    { View: 'Tiếng Việt', type: 'vi' },
    { View: 'English', type: 'en' },
    { View: '한국어', type: 'ko' },
    { View: '中国', type: 'zh' },
    { View: 'Português', type: 'pt' }
]
export function DeviceLanguage() {
    getLanguages().then(lang => {
        ListLanguage.forEach(data => {
            if (data.type == lang[0]) {
                I18n.locale = lang[0];
                setData('languages', lang[0])
                return;
            } else {
                I18n.locale = 'en';
                setData('languages', 'en');
                return;
            }
        })
    }).catch(err => {
        console.log(err)
    })
}
export function selectLang() {
    try {
        getData('languages').then(data => {
            I18n.locale = data
        })
    } catch (error) {

    }
}



export default I18n;
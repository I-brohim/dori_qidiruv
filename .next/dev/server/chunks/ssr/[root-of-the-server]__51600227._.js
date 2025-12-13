module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/context/LanguageContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const translations = {
    // Header
    'header.search': {
        uz: 'Qidiruv',
        ru: 'Поиск'
    },
    'header.sources': {
        uz: 'Manbalar',
        ru: 'Источники'
    },
    'header.medicines_available': {
        uz: 'ta dori mavjud',
        ru: 'лекарств доступно'
    },
    'header.sources_title': {
        uz: 'Manbalar',
        ru: 'Источники'
    },
    'header.sources_subtitle': {
        uz: "Ma'lumot manbalari",
        ru: 'Источники информации'
    },
    // Search
    'search.placeholder': {
        uz: 'Dori nomi, faol modda yoki ishlab chiqaruvchini kiriting...',
        ru: 'Введите название лекарства, активное вещество или производителя...'
    },
    'search.results_found': {
        uz: 'ta natija topildi',
        ru: 'результатов найдено'
    },
    'search.no_results': {
        uz: 'Hech narsa topilmadi',
        ru: 'Ничего не найдено'
    },
    'search.start_search': {
        uz: 'Qidiruvni boshlang',
        ru: 'Начните поиск'
    },
    'search.loading': {
        uz: 'Yuklanmoqda...',
        ru: 'Загрузка...'
    },
    // Filters
    'filter.no_prescription': {
        uz: 'Retseptsiz',
        ru: 'Без рецепта'
    },
    'filter.with_prescription': {
        uz: 'Retsept bilan',
        ru: 'По рецепту'
    },
    'filter.all': {
        uz: 'Hammasi',
        ru: 'Все'
    },
    // Medicine card
    'medicine.dosage_form': {
        uz: 'Dori shakli:',
        ru: 'Форма выпуска:'
    },
    'medicine.active_ingredient': {
        uz: 'Faol modda:',
        ru: 'Активное вещество:'
    },
    'medicine.manufacturer': {
        uz: 'Ishlab chiqaruvchi:',
        ru: 'Производитель:'
    },
    'medicine.group': {
        uz: 'Guruh:',
        ru: 'Группа:'
    },
    'medicine.prescription_required': {
        uz: 'Retsept bilan',
        ru: 'По рецепту'
    },
    'medicine.no_prescription': {
        uz: 'Retseptsiz',
        ru: 'Без рецепта'
    },
    // Footer
    'footer.medicines_list': {
        uz: "Dorilar ro'yxati",
        ru: 'Список лекарств'
    },
    'footer.sources_link': {
        uz: 'Manbalar →',
        ru: 'Источники →'
    },
    // Sources page
    'sources.title1': {
        uz: 'Retseptsiz beriladigan dori vositalari',
        ru: 'Лекарства, отпускаемые без рецепта'
    },
    'sources.telegram_view': {
        uz: "Telegram kanalida ko'rish",
        ru: 'Посмотреть в Telegram канале'
    },
    'sources.title2': {
        uz: "Cheklangan narxlar ro'yxati",
        ru: 'Список предельных цен'
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('uz');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load language from localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguageState(savedLanguage);
        }
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };
    const t = (key)=>{
        return translations[key]?.[language] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/LanguageContext.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__51600227._.js.map
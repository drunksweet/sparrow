import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', 'public', '.github', '.husky', '.vscode', 'coverage'],
  },

  js.configs.recommended,
  prettierConfig, // 关闭与 Prettier 冲突的 ESLint 规则

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // 启用 Node.js 全局变量
        jest: true, // 启用 Jest 环境的全局变量
        /** 追加一些其他自定义全局规则 */
      },
    },
  },

  /**
   * 配置React相关规则
   */
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn', // 使用 Prettier 格式化代码
      // React 插件常用规则
      'react/jsx-uses-react': 'warn',
      'react/react-in-jsx-scope': 'off', // 如果你用的是React 17+，可以关掉这条
      'react/prop-types': 'off', // 如果你没用 PropTypes（JS 项目常见）
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },
  // ✅ 增加这个 overrides 让测试文件支持 Jest 全局变量
  {
    files: ['**/__tests__/**/*.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];

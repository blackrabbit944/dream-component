module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js'
    }
};

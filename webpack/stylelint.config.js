module.exports = {
		extends: [
        'stylelint-config-standard'
    ],
    rules: {
        'selector-list-comma-newline-after': [ 'always', { severity: 'warn' } ],
        'unit-blacklist': [ 'px' ]
    }
}

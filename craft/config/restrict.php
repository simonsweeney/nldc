<?php
return [
    'enabled'     => true,

    // Add any IPs you want to be able to access the CP
    'ipWhitelist' => [
        '83.80.23.4',
        '144.44.0.0/16',
        '158.67.208.0/22',
        '129.189.0.0/16',
        '158.67.180.0/22'
    ],

    // Logged in admins can bypass the whitelist
    'allowAdmins' => false,

    // By default, the plugin will throw a exception if the IP isn't in the whitelist
    // If you want to redirect to an url instead, set it here
    'redirectUrl' => null,

    // Or you want to render a template, set it here
    'template'    => null
];
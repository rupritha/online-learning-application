<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '>s_;<:7C6mN;490zAX=.LLyKwS6 y&ZFXodE^tgW:?2zwyW(_8kp&k4 qx)daF!0' );
define( 'SECURE_AUTH_KEY',   'O*A6O{j/fp?!mblY$>tz$(E*k8x3R!Mwbg&qzE?:U(XngE${`_g#x[qu0T#sCM^&' );
define( 'LOGGED_IN_KEY',     'd9M,>[iH}BIInv4pkyJUY:FdEa|9srR]8%fHCzi*`1Z4X;qiLr)wO8J9SJ&>p-/M' );
define( 'NONCE_KEY',         '=xX3aY9BE`GRqWd/nP:+;tCv6Vy!]+{]FagSr%wSGllC$GnyvOG3KJb,6nv^ZQV ' );
define( 'AUTH_SALT',         'z#d{Cw@fh|2T;3JsxP$RXQEx$S3>{$`9:cts].05zz!Pit;9 c*CI^$~<O>[T4zh' );
define( 'SECURE_AUTH_SALT',  'o@Gx>e59ySV&7-dy/0K{N}w 7d?>3&&/][^~HVb4n@d%Q6H.,f,z#AgFN X3N7BE' );
define( 'LOGGED_IN_SALT',    'VL,;l>(b2_2W-onJd[flH`/bawCci1I/xZ1*?T:&CFX[AnBxuiE-6PT${fEh/}Zb' );
define( 'NONCE_SALT',        '[Xh:VOzY@~3[JhcksH.tLo0$UgPSBwQ!;(]oZ&u*~q&8a@Cu}]1!~?5t=.n;Q`oG' );
define( 'WP_CACHE_KEY_SALT', ',5xG#{s4migz/yvod9Y4aB2?g~5cA<(KBx;:5p8BBv*hA}5v-[j{vL<|PrgY3FT)' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
define( 'SURECART_ENCRYPTION_KEY', 'd9M,>[iH}BIInv4pkyJUY:FdEa|9srR]8%fHCzi*`1Z4X;qiLr)wO8J9SJ&>p-/M' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

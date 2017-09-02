# rich-app

#### Nodejs

Make sure that you have Node.js installed (this includes the npm command). The LTS version should be used (currently v6.11.2 LTS).

Instructions for different platforms are shown on the nodejs.org website.

#### Global Node Packages

The development environment requires Ionic2 and Cordova to be installed as global node packages. You can check what is installed using -

```
$ npm list -g --depth=0

├── @angular/cli@1.3.1
├── cordova@7.0.1
├── http-server@0.10.0
├── ionic@3.9.2
├── ios-deploy@1.9.1
└── npm@3.10.10
```

If other versions are installed they can be removed using -

`npm uninstall -g ionic cordova`

Install the correct versions using -

`npm install -g cordova@7.0.1`
`npm install -g ionic@3.9.2`

#### Project Node packages

The node packages for the project are located in the `node_modules` folder, if this exists then delete it.

The required packages with the correct versions are defined within the `packages.json` file. To install these packages run -

`npm install`

#### Platform

In order to build and deploy the app on a device then the correct platform needs to be installed. For IOS development install the plaform as using -

`ionic platform add ios`

For Android, install the platform using -

`ionic platform add android`


#### Running The App In The Browser

To run serve the app run the following -

`ionic serve`

The app can then be viewed in a browser at `http://localhost:8100`

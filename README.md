# bPanel UI
The bPanel UI library is a component library of reusable UI elements for use in [bPanel](https://bpanel.org).
The purpose of this library is to make it easy to contribute to the development of the UI and to empower
developers to create their own custom versions of the GUI and to enable a unified user experience
in the bcoin family of interfaces.

You can learn more about how to develop with bPanel UI, including all of the components
and utilities available on the [documentation website](https://bpanel.org/docs/ui-introduction.html) or demo
all of the components by installing the [BUI plugin](https://github.com/bpanel-org/bui) into your own version of
bPanel.

## Usage
If using outside of bPanel, you need to install it first.
```bash
$ npm install --save @bpanel/bpanel-ui
```

For bPanel plugins though, simply add it to peerDependencies in your package.json.

```json
...
peerDependencies {
  "@bpanel/bpanel-ui": "*"
}
...
```

And then import into your project

```
import { Text, Header } from '@bpanel/bpanel-ui';

export default () => (
  <div>
    <Header type="h2">Some Header</Header>
    <Text type="p">Some text</Text>
  </div>
);
```

## Contributions
We love contributions! If there is a component you think would be useful for other bPanel UI developers (or even
in other projects), we welcome PRs to add support for new UI elements. The most important thing is to make sure
that your component inherits from the [bPanel theming system](https://bpanel.org/docs/ui-utilities.html#connecttheme).
Contributions should ideally link to a corresponding [BUI plugin](https://github.com/bpanel-org/bui) PR that showcases
your new component and how users can implement it themselves.

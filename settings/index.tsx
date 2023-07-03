const HelloWorld = (_props) => {
  return (
    <Page>
      <Section title="Pride Pills Settings">
        <Toggle
          settingsKey="independent-complications"
          label="Change complications independently"
        />
        <Text>
          Toggle this so you can change the mini and main complication
          independently.
        </Text>
      </Section>
    </Page>
  );
};

registerSettingsPage(HelloWorld);

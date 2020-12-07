import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Drawer, TextareaItem} from '@ant-design/react-native';

const styles = StyleSheet.create({
  nameView: {
    flex: 1,
    justifyContent: 'center',
  },
  setupView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default function HostGame() {
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);
  const [editGameMode, setEditGameMode] = useState(true);

  const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);

  return (
    <React.Fragment>
      <View>
        <Text>Host a game</Text>
      </View>
      {step === 0 && (
        <View style={styles.nameView}>
          <TextareaItem
            autoFocus
            onChange={setName}
            placeholder="Your name"
            value={name}
          />
          <Button type="primary" onPress={nextStep}>
            Next
          </Button>
        </View>
      )}
      {step === 1 && (
        <Drawer
          position="left"
          open={editGameMode}
          sidebar={<EditGame />}
          drawerBackgroundColor="#ccc"
          onOpenChange={setEditGameMode}>
          <View style={styles.setupView}>
            <Text>GAMECODE</Text>
            <Button onPress={() => setEditGameMode(true)}>Edit game</Button>
          </View>
        </Drawer>
      )}
    </React.Fragment>
  );
}

function EditGame() {
  return (
    <ScrollView>
      <Text>Edit pane</Text>
    </ScrollView>
  );
}

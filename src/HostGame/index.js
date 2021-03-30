import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Drawer, Tag, TextareaItem} from '@ant-design/react-native';
import {Redirect, useParams} from 'react-router-native';
import useCopy from '../copy';
import createId from '../createId';

const styles = StyleSheet.create({
  nameView: {
    flex: 1,
    justifyContent: 'center',
  },
  setupView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  gameId: {
    alignSelf: 'center',
  },
});

export default function HostGame() {
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);
  const [editGameMode, setEditGameMode] = useState(true);
  const {gameId} = useParams();

  const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);
  const copy = useCopy();

  if (!gameId) {
    console.log('there is no gameId');
    return <Redirect to={`/host/${createId()}`} />;
  }

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
            onSubmitEditing={nextStep}
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
            <Tag style={styles.gameId} onLongPress={copy}>
              {gameId}
            </Tag>
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
      <Text>Edit game</Text>
    </ScrollView>
  );
}

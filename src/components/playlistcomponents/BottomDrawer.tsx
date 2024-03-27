import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import {Portal} from 'react-native-paper';

type Props = {
  visible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  theme: any;
};

const BottomDrawer = ({visible, hideModal, children, theme}: Props) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      swipeDirection={['down']}
      onSwipeComplete={hideModal}
      useNativeDriverForBackdrop
      propagateSwipe={true}
      style={styles.modal}>
      <Portal.Host>
        <View style={styles.modalWrapper}>
          <View
            style={{
              ...styles.view,
              backgroundColor: theme.colors.background,
            }}>
            {/*indicator for touch*/}
            <View style={styles.draggable} />
            <View style={styles.filterContainer}>{children}</View>
          </View>
        </View>
      </Portal.Host>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flex: 1,
    alignSelf: 'flex-end',
    minHeight: '50%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  draggable: {
    width: 50,
    height: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flex: 1,
    margin: 20,
  },
});

export default BottomDrawer;

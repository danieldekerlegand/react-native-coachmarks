import React, { Component } from 'react';

import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  LayoutAnimation,
} from 'react-native';

import PropTypes from 'prop-types';


import TurtorialStep from './tutorialStep';

const { width, height } = Dimensions.get('window');

export default class CoachMarks extends Component {
  static propTypes = {
    numberOfSteps: PropTypes.number,
    coachMarks: PropTypes.array,
    visible: PropTypes.bool,
    congratsText: PropTypes.string,
    congratsImage: PropTypes.number,
    onClose: PropTypes.func,
    skipCongrats: PropTypes.bool,
  }

  state = {
    stepStates: [],
    isStarting: false,
    isEnding: false,
  }

  componentDidMount() {
    this.setDefaultStepStates();
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible && !this.state.isEnding}
        onRequestClose={() => {
          this.dismiss();
        }}
      >
        {!this.state.isStarting &&
          <View style={styles.visibleContainer}>
            <TouchableOpacity style={styles.backArea} activeOpacity={1} />
            <View style={styles.scene}>
              <View style={styles.container}>
               {this.props.congratsImage &&
                 <Image
                   style={{ width: 150, height: 150 }}
                   source={this.props.congratsImage}
                 />
               }
                <Text style={styles.centeringTxt}>{this.props.congratsText}</Text>
                <View style={styles.divider}/>
                <View style = {styles.button}>
                  <Button title="startTutorial" onPress={() => this.startTutorial()} />
                </View>
              </View>
              <View style={styles.skipScene}>
                <Button title="skipTutorial" onPress={() => this.dismiss()} />
              </View>
            </View>
          </View>
        }
        {this.renderCM()}
      </Modal>
    );
  }

  dismiss() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isEnding: true });
    this.props.onClose();
  }

  startTutorial() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isStarting: true });
    this.startCoachMarks();
  }

  setDefaultStepStates() {
    const states = [];
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      states.push(0);
    }
    this.setState({ stepStates: states, isStarting: Boolean(this.props.skipCongrats) }, () => {
      if (this.props.skipCongrats) {
        this.startTutorial()
      }
    });
  }

  startCoachMarks() {
    const states = this.state.stepStates;
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === 0) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }

    this.setState({ stepStates: states });
  }

  OKBtn(step, onPressOK) {
    const states = this.state.stepStates;
    if (step === this.props.numberOfSteps - 1) {
      this.dismiss();
    }
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === step + 1) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }
    this.setState({ stepStates: states });

    if (onPressOK) {
      onPressOK();
    }
  }

  renderCM() {
    const {
      numberOfSteps, coachMarks,
    } = this.props;
    const CM = [];
    for (let i = 0; i < numberOfSteps; i++) {
      const state = this.state.stepStates[i];
      CM.push(<TurtorialStep
        key={i}
        step={i}
        tooltip={coachMarks[i].tooltip}
        style={coachMarks[i].style}
        position={coachMarks[i].position}
        tooltipPosition={coachMarks[i].tooltipPosition}
        visible={state !== 0}
        onPress={step => this.OKBtn(step, coachMarks[i].onPressOK)}
        styles={this.props.styles}
        okEnable={coachMarks[i].okEnable}
        onPressMark={coachMarks[i].onPressMark}
        endModal={coachMarks[i].endModal}
        isCircleMask={coachMarks[i].isCircleMask}
        imagePosition={coachMarks[i].imagePosition}
        imageSource={coachMarks[i].imageSource}
        okButtonPosition={coachMarks[i].okButtonPosition}
      />);
    }
    return (
      <View>
        {CM}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visibleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArea: {
    width,
    height,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,1)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeringTxt: {
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    paddingHorizontal:16,
    paddingVertical:16,
  },
  skipScene: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 70,
  },
  divider: {
    backgroundColor: 'rgba(0,0,0,1)',
    width: 268,
    height: 1,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical:8,
  },
  buttonText: {
    color: 'rgba(0,0,0,1)',
  },
  skip: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  skipText: {
    color: 'rgba(0,0,0,1)',
    fontSize: 13,
  },
});
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image, LayoutAnimation, TouchableOpacity,Button } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class TurtorialStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    tooltip: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    position: PropTypes.object,
    tooltipPosition: PropTypes.object,
    onPress: PropTypes.func,
    okEnable: PropTypes.bool,
    onPressMark: PropTypes.func,
    endModal: PropTypes.bool,
    isCircleMask: PropTypes.bool,
    imagePosition: PropTypes.object,
    imageSource: PropTypes.number,
    okButtonPosition: PropTypes.object
  };

  static defaultProps = {
    okEnable: true,
    endModal: false,
    isCircleMask: true,
  };

  render() {
    const {
      tooltip, visible, position, tooltipPosition, okEnable, onPressMark, endModal, isCircleMask, imagePosition, imageSource, okButtonPosition
    } = this.props;

    const firstOverlayWidth = position.left;
    const firstOverlayHeight = height;
    const firstOverlayX = 0;
    const firstOverlayY = 0;

    const secondOverlayWidth = this.props.style.width;
    const secondOverlayHeight = position.top;
    const secondOverlayX = position.left;
    const secondOverlayY = 0;

    const thirdOverlayWidth = width - position.left - this.props.style.width;
    const thirdOverlayHeight = height;
    const thirdOverlayX = position.left + this.props.style.width;
    const thirdOverlayY = 0;

    const fourthOverlayWidth = this.props.style.width;
    const fourthOverlayHeight = height - position.top - this.props.style.height;
    const fourthOverlayX = position.left;
    const fourthOverlayY = position.top + this.props.style.height;
    const lineLogoImg = require('../mask.png');

    return (
      visible &&
        <View style={styles.backArea}>
          <View style={[styles.overlay,
            {
              left: firstOverlayX,
              top: firstOverlayY,
              width: firstOverlayWidth,
              height: firstOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: secondOverlayX,
              top: secondOverlayY,
              width: secondOverlayWidth,
              height: secondOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: thirdOverlayX,
              top: thirdOverlayY,
              width: thirdOverlayWidth,
              height: thirdOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: fourthOverlayX,
              top: fourthOverlayY,
              width: fourthOverlayWidth,
              height: fourthOverlayHeight,
            }]}
          />
          {!endModal &&
          <View>
            <View style={[styles.tooltip, tooltipPosition]}>
              <Text style={styles.tooltipText}>{tooltip}</Text>
              <View style={[styles.okButton, okButtonPosition]}>
                  {okEnable && <Button title="OK" onPress={() => this.OKButton()} />}
              </View>
            </View>
            <View style={[styles.image, imagePosition]}>
              <Image 
                    source={imageSource} 
                    style={styles.image}
                    />
            </View>
          </View>
          }
          {okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              <View style={[this.props.style, styles.coachMarks]} />
            </View>
          }
          {!okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              {isCircleMask &&
              <Image
                source={lineLogoImg}
                resizeMode="stretch"
                style={{
                flex: 1,
                width: null,
                height: null,
            }}
              />
            }
              <View style={[this.props.style, styles.coachMarks]}>
                <TouchableOpacity
                  onPress={() => {
                  this.OKButton();
                  onPressMark();
                }}
                  style={{ width: this.props.style.width, height: this.props.style.height }}
                  activeOpacity={0.8}
                />
              </View>
            </View>
          }
        </View>
    );
  }

  OKButton() {
    LayoutAnimation.easeInEaseOut();
    this.props.onPress(this.props.step);
  }
}

const styles =  StyleSheet.create({
  coachMarks: {
    position: 'absolute'  
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(216, 213, 212, 0.8)',
    overflow: 'hidden',
    position: 'absolute',
    alignSelf: 'center',
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    flex: 1,
    width: 115,
    resizeMode: 'contain'
  },
  tooltipText: {
    color: '#f9a847',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 15,
  },
  okButton: {
    backgroundColor: 'white', 
    borderRadius: 5    
  },
  backArea: {
    width,
    height,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: 150,
  },
  buttonText: {
    color: 'rgba(70, 165, 135, 1)',
  },
  dogImage: {
    marginVertical: 16,
    marginTop: 15,
    marginBottom: 10,
    width: 124,
    height: 124,
  },
  centeringTxt: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
  },
  skipScene: {
    position: 'absolute',
    width: 300,
    height: 70,
    left: (width - 300) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
  },
});
import React, { Component } from 'react';

import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  LayoutAnimation,
} from 'react-native';

import PropTypes from 'prop-types';


import TurtorialStep from './tutorialStep';

const { width, height } = Dimensions.get('window');

export default class CoachMarks extends Component {
  static propTypes = {
    numberOfSteps: PropTypes.number,
    coachMarks: PropTypes.array,
    visible: PropTypes.bool,
    congratsText: PropTypes.string,
    congratsImage: PropTypes.number,
    onClose: PropTypes.func,
    skipCongrats: PropTypes.bool,
  }

  state = {
    stepStates: [],
    isStarting: false,
    isEnding: false,
  }

  componentDidMount() {
    this.setDefaultStepStates();
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible && !this.state.isEnding}
        onRequestClose={() => {
          this.dismiss();
        }}
      >
        {!this.state.isStarting &&
          <View style={styles.visibleContainer}>
            <TouchableOpacity style={styles.backArea} activeOpacity={1} />
            <View style={styles.scene}>
              <View style={styles.container}>
               {this.props.congratsImage &&
                 <Image
                   style={{ width: 150, height: 150 }}
                   source={this.props.congratsImage}
                 />
               }
                <Text style={styles.centeringTxt}>{this.props.congratsText}</Text>
                <View style={styles.divider}/>
                <View style = {styles.button}>
                  <Button title="startTutorial" onPress={() => this.startTutorial()} />
                </View>
              </View>
              <View style={styles.skipScene}>
                <Button title="skipTutorial" onPress={() => this.dismiss()} />
              </View>
            </View>
          </View>
        }
        {this.renderCM()}
      </Modal>
    );
  }

  dismiss() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isEnding: true });
    this.props.onClose();
  }

  startTutorial() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isStarting: true });
    this.startCoachMarks();
  }

  setDefaultStepStates() {
    const states = [];
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      states.push(0);
    }
    this.setState({ stepStates: states, isStarting: Boolean(this.props.skipCongrats) }, () => {
      if (this.props.skipCongrats) {
        this.startTutorial()
      }
    });
  }

  startCoachMarks() {
    const states = this.state.stepStates;
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === 0) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }

    this.setState({ stepStates: states });
  }

  OKBtn(step, onPressOK) {
    const states = this.state.stepStates;
    if (step === this.props.numberOfSteps - 1) {
      this.dismiss();
    }
    for (let i = 0; i < this.props.numberOfSteps; i++) {
      if (i === step + 1) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }
    this.setState({ stepStates: states });

    if (onPressOK) {
      onPressOK();
    }
  }

  renderCM() {
    const {
      numberOfSteps, coachMarks,
    } = this.props;
    const CM = [];
    for (let i = 0; i < numberOfSteps; i++) {
      const state = this.state.stepStates[i];
      CM.push(<TurtorialStep
        key={i}
        step={i}
        tooltip={coachMarks[i].tooltip}
        style={coachMarks[i].style}
        position={coachMarks[i].position}
        tooltipPosition={coachMarks[i].tooltipPosition}
        visible={state !== 0}
        onPress={step => this.OKBtn(step, coachMarks[i].onPressOK)}
        styles={this.props.styles}
        okEnable={coachMarks[i].okEnable}
        onPressMark={coachMarks[i].onPressMark}
        endModal={coachMarks[i].endModal}
        isCircleMask={coachMarks[i].isCircleMask}
        imagePosition={coachMarks[i].imagePosition}
        imageSource={coachMarks[i].imageSource}
        okButtonPosition={coachMarks[i].okButtonPosition}
      />);
    }
    return (
      <View>
        {CM}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visibleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArea: {
    width,
    height,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,1)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeringTxt: {
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    paddingHorizontal:16,
    paddingVertical:16,
  },
  skipScene: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 70,
  },
  divider: {
    backgroundColor: 'rgba(0,0,0,1)',
    width: 268,
    height: 1,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical:8,
  },
  buttonText: {
    color: 'rgba(0,0,0,1)',
  },
  skip: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  skipText: {
    color: 'rgba(0,0,0,1)',
    fontSize: 13,
  },
});

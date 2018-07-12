import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Perils of having a nested tree strucutre in the Redux State

export default function oracleReducer(state = initialState.oracle, action) {
  switch (action.type) {
    case types.SET_LOADER_STATE:
      return Object.assign({}, state, { loaderState: action.loaderState })
    case types.SET_CHROMOSOME_MODE:
      return Object.assign({}, state, { configuration: { ...state.configuration, isChromosomeModeON: action.isChromosomeModeON } })
    case types.SET_SOURCEID:
      return Object.assign({}, state, { sourceID: action.sourceID })
    case types.SET_CONFIGURATION:
      return Object.assign({}, state, { configuration: action.configuration })
    case types.SET_ROOT_MARKERS:
      return Object.assign({}, state, { configuration: { ...state.configuration, markers: action.markers } })
    case types.SET_SNAPSHOT_LIST:
      return Object.assign({}, state, { snapshotList: action.snapshotList })
    case types.SET_ALIGNMENT_LIST:
      return Object.assign({}, state, { configuration: { ...state.configuration, alignmentList: action.alignmentList } })
    case types.SET_FILTER_LEVEL:
      return Object.assign({}, state, { configuration: { ...state.configuration, filterLevel: action.filterLevel } })
    default:
      return state;
  }
}
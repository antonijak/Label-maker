// import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../store/actions/actions';

// import './styles.scss';

// const Producer = props => {
//   const {
//     producer,
//     producersList,
//     toggleProducers,
//     errorMessage,
//     producersVisible,
//     handleChange,
//     useProducer,
//     addProducer,
//     removeProducer
//   } = props;
//   return (
//     <div className="producer container">
//       <h3 className="producer__title">Producer information</h3>
//       <div>
//         {producersList.length && producersVisible > 0 ? (
//           <div className="producer__list">
//             {producersList.map((item, i) => (
//               <div
//                 key={i + 1}
//                 onClick={e => {
//                   useProducer(e, item);
//                 }}
//                 className={
//                   item.producerName === producer.producerName
//                     ? 'producer__list__item active'
//                     : 'producer__list__item'
//                 }
//               >
//                 <span>{item.producerName}</span>
//                 <button
//                   className="producer__list__item__delete"
//                   onClick={e => removeProducer(e, item.id)}
//                 />
//               </div>
//             ))}
//             <button
//               onClick={toggleProducers}
//               className="producer__list__item add"
//             >
//               + Add new
//             </button>
//           </div>
//         ) : (
//           <div>
//             <small>{errorMessage}</small>
//             <input
//               name="producerName"
//               type="text"
//               onChange={handleChange}
//               value={producer.producerName}
//               placeholder="Company name"
//             />
//             <input
//               name="producerAddress"
//               type="text"
//               onChange={handleChange}
//               value={producer.producerAddress}
//               placeholder="Company address"
//             />
//             <input
//               name="producerCountry"
//               type="text"
//               onChange={handleChange}
//               value={producer.producerCountry}
//               placeholder="Country"
//             />
//             <input
//               name="producerContact"
//               type="text"
//               onChange={handleChange}
//               value={producer.producerContact}
//               placeholder="Contact*"
//             />
//             <div className="producer__buttons">
//               <button
//                 className="producer__buttons__button save"
//                 onClick={addProducer}
//               >
//                 Save
//               </button>
//               {producersList.length > 0 && (
//                 <button
//                   className="producer__buttons__button use"
//                   onClick={toggleProducers}
//                 >
//                   Use from database
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = state => {
//   return {
//     producersList: state.producersList,
//     producer: state.producer,
//     producersVisible: state.producersVisible,
//     errorMessage: state.validationErrors.producer
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     handleChange: e => dispatch(actions.handleChange(e)),
//     validate: e => dispatch(actions.validate(e)),
//     toggleProducers: e => dispatch(actions.toggleProducers(e)),
//     useProducer: (e, producer) => dispatch(actions.useProducer(e, producer)),
//     addProducer: e => dispatch(actions.addProducer(e)),
//     removeProducer: (e, id) => dispatch(actions.removeProducer(e, id))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Producer);

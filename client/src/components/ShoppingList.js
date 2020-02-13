import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { getItemsAction, delItemAction, editAmountAction } from '../actions/itemActions'

const ShoppingList = () => {
  const dispatch = useDispatch()
  // const [item, setItem] = useState({})
  const { items, loading } = useSelector(state => state.itemReducer)

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch])
  
  // if(items.length > 0) {
    // console.log(items)
  // }
  const content = loading ? (<h3>Loading...</h3>) : (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name, amount }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem style={{ wordWrap: "break-word" }}>
              <Button
                  className="amount-btn"
                  color="success"
                  size="sm"
                  onClick={() => {
                    dispatch(editAmountAction({ id: _id, amount: amount+1 }));
                    // console.log({ id: _id, amount: amount+1 })
                  }}
                >&#43;</Button>
                {amount}
                <Button
                  className="amount-btn"
                  color="success"
                  size="sm"
                  onClick={() => {
                    dispatch(editAmountAction({ id: _id, amount: amount-1 }));
                  }}
                >&minus;</Button>
                <span style={{ marginLeft: '1rem' }}>{name}</span>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    dispatch(delItemAction(_id));
                  }}
                >&times;</Button>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );

  return (
    <div>
      {content}
    </div>
  )
}

export default ShoppingList;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 10em;
    overflow-y: auto;
    padding-left: 0;
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0;
    background: #fff;
    border: 1px solid #e2e2e2;
`

const ListElement = styled.li`
      cursor: pointer;
        transition: all .1s ease-in;
        background-color: transparent;
        padding: 0.5em;
        &:hover {
            background-color: #EEEEEE;
        }
`

const suggestionsListComponent = ({suggestions, onClick}) => {
    return (
        <List role="component">
            {suggestions.map(suggest => {
                return (
                    <ListElement
                        className="suggest-list-element"
                        key={suggest.value}
                        onClick={() => onClick(suggest.value, suggest.label)}
                        tabIndex="0"
                    >
                        {suggest.label}
                    </ListElement>
                );
            })}
        </List>
    );
};

suggestionsListComponent.propTypes = {
    suggestions: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default suggestionsListComponent;

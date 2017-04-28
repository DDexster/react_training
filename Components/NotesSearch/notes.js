// ***********Note Component**********************

var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});
// ***********Note Component**********************
//*************ColorPicker Component*******************
var ColorPicker = React.createClass({
  // getInitialState: function () {
  //   return {
  //     isActive: false;
  //   }
  // },
  render: function () {
    var style = {
      backgroundColor: this.props.pick,
    };
    return (
      <li className="pick-item" style={style} onClick={this.props.onClick}>
        {/* {
          this.props.isActive ?
          return (
            &#10004
          ); :
          false
        } */}
      </li>
    );
  }
});
//*************ColorPicker Component*******************
// ***********NoteEditor Component**********************
var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color: 'yellow',
            isNoteActive: false,
            colors: ['#EBC2E7','#9CDEC3','#B3E6E5','#B6BDE7','#DFA79F', '#CFE3AB']
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleNoteAdd: function() {
      var newNote = {
          text: this.state.text,
          color: this.state.color,
          id: Date.now()
      };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    },

    colorChange: function (pick) {
      this.setState({
        color: pick,
      });

    },

    render: function() {
        var onColorChange = this.colorChange;
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <ul className="picker-container">
                  {
                    this.state.colors.map(function (pick) {
                      return (
                          <ColorPicker
                            key={pick}
                            pick={pick}
                            onClick={onColorChange.bind(null, pick)}
                             />
                      );
                    })
                  }
                </ul>

                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});
// ***********NoteEditor Component**********************

// ***********NoteGrid Component**********************
var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                { this.props.notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});
// ***********NoteGrid Component**********************
// ***********SearchBar Component**********************
var SearchBar = React.createClass({
  getInitialState:function () {
    return {
      value: ''
    }
  },

  resetValue: function () {
    this.setState({
      value: ''
    });
  },

  handleChange: function (e) {
    var query = e.target.value.toLowerCase();
    this.setState({
      value: query
    });
    this.props.onSearch(query);
  },

  render: function(){
    return(
      <div className="search-block">
        <input type="text"
              placeholder="Search..."
              className="search-field"
              value={this.state.value}
              onChange={this.handleChange} />
      </div>
    )
  }
});
// ***********SearchBar Component**********************
// ***********NoteApp Component**********************
var NotesApp = React.createClass({
    NOTES: [],

    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        this.NOTES = JSON.parse(localStorage.getItem('notes'));
        if (this.NOTES) {
            this.setState({ notes: this.NOTES });
        }
    },

    componentDidUpdate: function(){
      this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.NOTES.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({
          notes: newNotes
        });
        this.NOTES = newNotes;
        this.refs.search.resetValue();
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.NOTES.slice();
        newNotes.unshift(newNote);
        this.NOTES = newNotes;
        this.setState({
          notes: newNotes
        });
        this.refs.search.resetValue();
    },

    handleSearch: function (searchQuery) {
        if (searchQuery) {
        var displayedNotes = this.NOTES.filter(function(note){
          var searchValue = note.text.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
          notes: displayedNotes
        });
      } else {
        this.setState({
          notes: this.NOTES
        });
      }
    },

    render: function() {
        var isNotes = this.state.notes.length!==0;
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <SearchBar onSearch={this.handleSearch} ref="search" />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <div>
                  { isNotes ?
                  (<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />)
                  :
                  (<h2 className="app-header">No items to display</h2>)
                  }
                </div>

            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.NOTES);
        localStorage.setItem('notes', notes);
    }

});
// ***********NoteApp Component**********************

// ***********Rendering**********************
ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);
// ***********Rendering**********************

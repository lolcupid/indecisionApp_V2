class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.state = {
      options: ["Thing one", "Thing two", "Thing four"]
    };
  }

  handlePick() {
    const random = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[random];
    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return "Enter Valid Item to add in it";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Item already exist";
    }

    this.setState(() => {
      return {
        options: [...this.state.options, option]
      };
    });
  }

  handleRemoveAll() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  render() {
    const title = "Indecision";
    const subtitle = "Put your life in the hands of a computer";
    
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOption={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

/* ================================================ */
/* ================================================ */

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOption} onClick={props.handlePick}>
        What should I do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.map(option => (
        <Option key={option} optionText={option} />
      ))}
    </div>
  );
};
const Option = (props) => {
  return <div>{props.optionText}</div>;
};


class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  addOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => {
      return { error };
    });
    e.target.elements.option.value = "";
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.addOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));

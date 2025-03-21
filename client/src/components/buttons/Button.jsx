
import PropTypes from "prop-types";

function Button({ className, onClick, icon }) {
  return (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  event: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default Button;

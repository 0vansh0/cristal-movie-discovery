import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Apple,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Upload,
  User,
  X,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { registerUser } from "../services/userService";
import Footer from "../components/Layout/Footer";
import "./Signup.css";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordScore(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

function PasswordRequirement({ valid, children }) {
  return (
    <span
      className={
        valid
          ? "password-requirement valid"
          : "password-requirement"
      }
    >
      {valid ? <Check size={12} /> : <X size={12} />}
      {children}
    </span>
  );
}

function FieldMessage({ children, success = false }) {
  return (
    <p
      className={
        success
          ? "signup-field-message success-message"
          : "signup-field-message"
      }
    >
      {success ? <Check size={13} /> : <X size={13} />}
      {children}
    </p>
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    collegeName: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordScore = useMemo(
    () => getPasswordScore(form.password),
    [form.password]
  );

  const emailValid = emailPattern.test(form.email.trim());
  const usernameValid = form.username.trim().length >= 3;

  const passwordValid =
    form.password.length >= 8 && passwordScore >= 3;

  const passwordsMatch =
    form.password.length > 0 &&
    form.password === form.confirmPassword;

  const formValid =
    usernameValid &&
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    acceptedTerms;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));

    setError("");
    setSuccess("");
  }

  function handleAvatar(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setError("Profile picture must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  }

  function validateForm() {
    if (!usernameValid) {
      return "Username must contain at least 3 characters.";
    }

    if (!emailValid) {
      return "Please enter a valid email address.";
    }

    if (!form.password) {
      return "Please create a password.";
    }

    if (!passwordValid) {
      return "Use at least 8 characters, one uppercase letter, one number, and one symbol.";
    }

    if (!form.confirmPassword) {
      return "Please confirm your password.";
    }

    if (!passwordsMatch) {
      return "Passwords do not match.";
    }

    if (!acceptedTerms) {
      return "Please accept the Terms of Service and Privacy Policy.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        collegeName: form.collegeName.trim(),
        password: form.password,
        avatar,
      });

      setSuccess(
        "Your account was created. Redirecting to login..."
      );

      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function showProviderMessage(provider) {
    setError(`${provider} sign-up is not connected yet.`);
  }

  return (
    <main className="signup-page">
      <div className="signup-background">
        <div className="signup-background-orb signup-orb-one" />
        <div className="signup-background-orb signup-orb-two" />
        <div className="signup-grain" />
      </div>

      <motion.section
        className="signup-shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <header className="signup-header">
          <Link to="/" className="signup-wordmark">
            CRISTAL
          </Link>

          <p className="signup-header-note">
            Your cinema, your way.
          </p>
        </header>

        <div className="signup-content">
          <div className="signup-intro">
            <span className="signup-kicker">JOIN CRISTAL</span>

            <h1>
              Create your
              <br />
              <em>account.</em>
            </h1>

            <p>
              Build a personal home for the movies and stories
              you love.
            </p>

            <div className="signup-intro-line" />
          </div>

          <div className="signup-form-column">
            {error && (
              <motion.div
                className="signup-alert error"
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                className="signup-alert success"
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {success}
              </motion.div>
            )}

            <form
              className="signup-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="avatar-upload">
                <label
                  className="avatar-label"
                  htmlFor="avatar-upload"
                  title="Choose a profile picture"
                >
                  <span className="avatar-preview">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                      />
                    ) : (
                      <User size={27} strokeWidth={1.5} />
                    )}
                  </span>

                  <span className="avatar-upload-icon">
                    <Upload size={13} strokeWidth={2} />
                  </span>
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleAvatar}
                />

                <div className="avatar-copy">
                  <strong>
                    {avatar
                      ? "Profile picture selected"
                      : "Add a profile picture"}
                  </strong>

                  <span>
                    {avatar
                      ? avatar.name
                      : "Optional · JPG, PNG or WEBP · Max 5MB"}
                  </span>
                </div>
              </div>

              <div className="signup-fields">
                <div
                  className={
                    touched.username && !usernameValid
                      ? "signup-field invalid"
                      : "signup-field"
                  }
                >
                  <label htmlFor="username">
                    Username
                  </label>

                  <div className="signup-input">
                    <User
                      size={17}
                      strokeWidth={1.6}
                    />

                    <input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={updateField}
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </div>

                  {touched.username && !usernameValid && (
                    <FieldMessage>
                      Use at least 3 characters.
                    </FieldMessage>
                  )}
                </div>

                <div
                  className={
                    touched.email && !emailValid
                      ? "signup-field invalid"
                      : "signup-field"
                  }
                >
                  <label htmlFor="email">
                    Email address
                  </label>

                  <div className="signup-input">
                    <Mail
                      size={17}
                      strokeWidth={1.6}
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                    {touched.email &&
                      form.email &&
                      emailValid && (
                        <Check
                          className="valid-icon"
                          size={16}
                        />
                      )}
                  </div>

                  {touched.email &&
                    form.email &&
                    !emailValid && (
                      <FieldMessage>
                        Enter a valid email address.
                      </FieldMessage>
                    )}
                </div>

                <div className="signup-field">
                  <label htmlFor="collegeName">
                    College
                    <span>Optional</span>
                  </label>

                  <div className="signup-input">
                    <GraduationCap
                      size={17}
                      strokeWidth={1.6}
                    />

                    <input
                      id="collegeName"
                      name="collegeName"
                      value={form.collegeName}
                      onChange={updateField}
                      placeholder="Your college or university"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div
                  className={
                    touched.password && !passwordValid
                      ? "signup-field invalid"
                      : "signup-field"
                  }
                >
                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="signup-input">
                    <Lock
                      size={17}
                      strokeWidth={1.6}
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={form.password}
                      onChange={updateField}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>

                  {form.password && (
                    <div className="password-help">
                      <div className="password-strength-top">
                        <span>Password strength</span>

                        <strong
                          className={`strength-${passwordScore}`}
                        >
                          {passwordScore <= 1
                            ? "Weak"
                            : passwordScore === 2
                            ? "Fair"
                            : passwordScore === 3
                            ? "Good"
                            : "Strong"}
                        </strong>
                      </div>

                      <div className="strength-bars">
                        {[1, 2, 3, 4].map(
                          (item) => (
                            <span
                              key={item}
                              className={
                                item <= passwordScore
                                  ? `filled strength-${passwordScore}`
                                  : ""
                              }
                            />
                          )
                        )}
                      </div>

                      <div className="password-requirements">
                        <PasswordRequirement
                          valid={
                            form.password.length >= 8
                          }
                        >
                          8+ characters
                        </PasswordRequirement>

                        <PasswordRequirement
                          valid={/[A-Z]/.test(
                            form.password
                          )}
                        >
                          1 uppercase
                        </PasswordRequirement>

                        <PasswordRequirement
                          valid={/[0-9]/.test(
                            form.password
                          )}
                        >
                          1 number
                        </PasswordRequirement>

                        <PasswordRequirement
                          valid={/[^A-Za-z0-9]/.test(
                            form.password
                          )}
                        >
                          1 symbol
                        </PasswordRequirement>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={
                    touched.confirmPassword &&
                    !passwordsMatch
                      ? "signup-field invalid"
                      : "signup-field"
                  }
                >
                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="signup-input">
                    <Lock
                      size={17}
                      strokeWidth={1.6}
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={form.confirmPassword}
                      onChange={updateField}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>

                  {touched.confirmPassword &&
                    form.confirmPassword &&
                    (passwordsMatch ? (
                      <FieldMessage success>
                        Passwords match.
                      </FieldMessage>
                    ) : (
                      <FieldMessage>
                        Passwords do not match.
                      </FieldMessage>
                    ))}
                </div>
              </div>

              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) =>
                    setAcceptedTerms(
                      event.target.checked
                    )
                  }
                />

                <span>
                  I agree to the{" "}
                  <Link to="/terms">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="signup-submit"
                disabled={loading || !formValid}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="spin"
                    />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <div className="signup-divider">
              <span />
              <p>or continue with</p>
              <span />
            </div>

            <div className="social-signup">
              <button
                type="button"
                onClick={() =>
                  showProviderMessage("Google")
                }
              >
                <FaGoogle size={15} />
                Google
              </button>

              <button
                type="button"
                onClick={() =>
                  showProviderMessage("Apple")
                }
              >
                <Apple
                  size={17}
                  strokeWidth={1.8}
                />
                Apple
              </button>
            </div>

            <p className="login-prompt">
              Already have an account?
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>

        <Footer />
      </motion.section>
    </main>
  );
}
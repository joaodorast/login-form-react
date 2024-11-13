import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  
  useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouchedFields({
      email: true,
      password: true
    });

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      
      console.log('Dados do formulário:', formData);
      
      
      setTimeout(() => {
        setFormData({ email: '', password: '' });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Erro ao fazer login. Tente novamente.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <h2>Bem-vindo de volta</h2>
          <p>Faça login para acessar sua conta</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="seu@email.com"
              className={errors.email && touchedFields.email ? 'error' : ''}
              disabled={isLoading}
            />
            <Mail className="input-icon" size={20} />
            {errors.email && touchedFields.email && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite sua senha"
              className={errors.password && touchedFields.password ? 'error' : ''}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle input-icon"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && touchedFields.password && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="error-message">
              <AlertCircle size={16} />
              {errors.submit}
            </div>
          )}

          {isSuccess && (
            <div className="success-message">
              <CheckCircle size={16} />
              Login realizado com sucesso!
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <Loader className="spinner animate-spin" size={16} />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="form-footer">
            <a href="#forgot-password">Esqueceu sua senha?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
class Client {
    constructor(id = null) {
      this.id = id;
      this.title = '';
      this.email = '';
      this.password = '';
      this.enabled = false;
      this.verificationCode = '';
      this.verificationExpire = null;
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getTitle() {
      return this.title;
    }
  
    setTitle(title) {
      this.title = title;
    }
  
    getEmail() {
      return this.email;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    getPassword() {
      return this.password;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    getVerificationCode() {
      return this.verificationCode;
    }
  
    setVerificationCode(verificationCode) {
      this.verificationCode = verificationCode;
    }
  
    getVerificationExpire() {
      return this.verificationExpire;
    }
  
    setVerificationExpire(verificationExpire) {
      this.verificationExpire = verificationExpire;
    }
  
    
    getUsername() {
      return this.title;
    }
  
    setUsername(username) {
      this.title = username;
    }
  
    getAuthorities() {
      return [];
    }
  
    isAccountNonExpired() {
      return true;
    }
  
    isAccountNonLocked() {
      return true;
    }
  
    isCredentialsNonExpired() {
      return true;
    }
  
    isEnabled() {
      return this.enabled;
    }
  
    setEnabled(enabled) {
      this.enabled = enabled;
    }
  }
  
  
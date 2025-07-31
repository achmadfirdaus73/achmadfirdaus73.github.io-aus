const { useState, useEffect } = React;
// Menggunakan React Router untuk navigasi page-view
// Karena Anda belum memiliki React Router, saya akan membuat implementasi sederhana
// yang mensimulasikan navigasi antar "halaman" tanpa library eksternal.
// Jika Anda ingin menggunakan React Router asli di masa depan, integrasinya akan lebih rapi.

// =================================== HOOKS & UTILITIES ===================================
function useWindowSize() {
    const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
    useEffect(() => {
        function handleResize(){
            setSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return size;
}

// =================================== Mock Data (Tetap ada sebagai fallback jika Firebase kosong) ===================================
const mockProducts = [
    { id: 'prod1', name: 'Mesin Cuci 2 Tabung', hargaModal: 2000000, images: ['https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=800'], description: 'Mesin cuci handal dengan dua tabung.', colors: ['Putih', 'Biru']},
    { id: 'prod2', name: 'Kulkas Showcase 1 Pintu', hargaModal: 3500000, images: ['https://images.unsplash.com/photo-1629910620383-693b75375392?w=800'], description: 'Kulkas dengan fitur pendingin cepat dan display kaca.', colors: ['Hitam', 'Silver']},
    { id: 'prod3', name: 'TV LED 42 Inch Smart', hargaModal: 4000000, images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f82e42?w=800', 'https://images.unsplash.com/photo-1571473210411-e49339794e77?w=800'], description: 'Nikmati tontonan berkualitas HD dengan fitur smart TV.', colors: ['Hitam']},
    { id: 'prod4', name: 'Laptop Kerja Ringan', hargaModal: 7500000, images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'], description: 'Laptop bertenaga untuk produktivitas maksimal, ringan dibawa.', colors: ['Space Gray', 'Silver']}
];

const mockPromos = [
    { id: 'promo1', productId: 'prod1', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', title: 'Promo Mesin Cuci!' },
    { id: 'promo2', productId: 'prod2', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', title: 'Diskon Kulkas!' },
    { id: 'promo3', productId: 'prod3', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', title: 'TV Terbaru Harga Spesial!' },
];

const mockUserAddresses = [
    { id: 'addr1', type: 'Rumah', address: 'Perumahan Griya Indah Blok C1 No. 5, Bekasi' },
    { id: 'addr2', type: 'Usaha', address: 'Jl. Raya Industri No. 10, Cikarang' }
];


// =================================== KOMPONEN: LOGIN & PROFIL LENGKAP ===================================
function LoginPage({ onLogin, onRegister }) {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            if (password !== confirmPassword) {
                alert('Password tidak cocok!');
                return;
            }
            onRegister(email, password);
        } else {
            onLogin(email, password);
        }
    };

    if (showSplash) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white' }}>
                <img src="https://raw.githubusercontent.com/achmadfirdaus73/firdaus/refs/heads/main/DT_G18_E-commerce-Animated-GIF-Icon.gif" alt="Loading ecomerce..." style={{ width: '350px', height: '300px' }} />
                <p style={{ color: '#888', marginTop: '1rem', fontSize: '1rem' }}>Loading ecomerce...</p>
            </div>
        );
    }

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: 450 }}>
                <h2 className="ui teal image header">
                    <i className="shipping fast icon"></i>
                    <div className="content">
                        {isRegister ? 'Daftar Akun Baru' : 'Silahkan Masuk'}
                    </div>
                </h2>
                <form className="ui large form" onSubmit={handleSubmit}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Alamat E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {isRegister && (
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Konfirmasi Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <button className="ui fluid large teal submit button" type="submit">
                            {isRegister ? 'Daftar' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="ui message">
                    {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); }}>
                        {isRegister ? 'Login di sini' : 'Daftar sekarang'}
                    </a>
                </div>
            </div>
        </div>
    );
}

function ProfileForm({ onSave, user }) {
    const [data, setData] = useState({
        namaLengkap: user?.namaLengkap || user?.email || '',
        jenisUsaha: user?.jenisUsaha || '',
        alamatRumah: user?.alamatRumah || '',
        alamatUsaha: user?.alamatUsaha || '',
        noHape: user?.noHape || '',
        nomorKtp: user?.nomorKtp || '',
        namaSales: user?.namaSales || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.namaLengkap || !data.jenisUsaha || !data.alamatRumah || !data.alamatUsaha || !data.noHape || !data.nomorKtp) {
            alert('Mohon lengkapi semua data profil yang wajib diisi (kecuali Nama Sales).');
            return;
        }
        onSave(data);
    };

    return (
        <div className="ui container" style={{marginTop:'2em'}}>
            <div className="ui segment">
                <h2 className="ui dividing header">Lengkapi Profil</h2>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="two fields">
                        <div className="field"><label>Nama Lengkap</label><input type="text" name="namaLengkap" value={data.namaLengkap} onChange={handleChange}/></div>
                        <div className="field"><label>Jenis Usaha</label><input type="text" name="jenisUsaha" value={data.jenisUsaha} onChange={handleChange}/></div>
                    </div>
                    <div className="field"><label>Alamat Rumah</label><textarea rows="2" name="alamatRumah" value={data.alamatRumah} onChange={handleChange}></textarea></div>
                    <div className="field"><label>Alamat Usaha</label><textarea rows="2" name="alamatUsaha" value={data.alamatUsaha} onChange={handleChange}></textarea></div>
                    <div className="three fields">
                        <div className="field"><label>No. HP</label><input type="text" name="noHape" value={data.noHape} onChange={handleChange}/></div>
                        <div className="field"><label>No. KTP</label><input type="text" name="nomorKtp" value={data.nomorKtp} onChange={handleChange}/></div>
                        <div className="field"><label>Nama Sales</label><input type="text" name="namaSales" value={data.namaSales} onChange={handleChange}/></div>
                    </div>
                    <button className="ui primary button" type="submit">Simpan</button>
                </form>
            </div>
        </div>
    );
}

// =================================== KOMPONEN: ADMIN DASHBOARD ===================================
function AdminDashboard({ user, onLogout, onAddProduct, products, onAddPromo, promos, orders, onUpdateOrderStatus, collectors, onAssignCollector, consumers }) {
    const [activeItem, setActiveItem] = useState('order');
    const [viewingBill, setViewingBill] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', hargaModal: '', images: '' });
    const [newPromoUrl, setNewPromoUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const size = useWindowSize();
    const isMobile = size.width < 768;

    useEffect(() => {
        if (viewingBill && $('.ui.progress').length) {
            setTimeout(() => $('.ui.progress').progress(), 50);
        }
    }, [viewingBill]);

    function AssignCollectorDropdown({ order, collectors, onAssignCollector }) {
        const [selectedCollectorUid, setSelectedCollectorUid] = useState('');
        const [selectedCollectorName, setSelectedCollectorName] = useState('');

        useEffect(() => {
            if (order.assignedCollectorUid && collectors.length > 0) {
                const assignedCol = collectors.find(c => c.uid === order.assignedCollectorUid);
                if (assignedCol) {
                    setSelectedCollectorUid(assignedCol.uid);
                    setSelectedCollectorName(assignedCol.name);
                }
            } else {
                setSelectedCollectorUid('');
                setSelectedCollectorName('');
            }
        }, [order.assignedCollectorUid, collectors]);

        if (order.assignedCollector) { return <span><i className="user check icon"></i>{order.assignedCollector}</span>; }
        
        return (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select 
                    className="ui mini dropdown" 
                    value={selectedCollectorUid} 
                    onChange={(e) => {
                        const uid = e.target.value;
                        const selectedCol = collectors.find(c => c.uid === uid);
                        setSelectedCollectorUid(uid);
                        setSelectedCollectorName(selectedCol ? selectedCol.name : '');
                    }}
                >
                    <option value="">Pilih</option>
                    {collectors && collectors.map(c => <option key={c.uid} value={c.uid}>{c.name}</option>)}
                </select>
                <button 
                    className="ui mini positive button" 
                    onClick={() => onAssignCollector(order.id, selectedCollectorName, selectedCollectorUid)} 
                    disabled={!selectedCollectorUid}
                >
                    Tugas
                </button>
            </div>
        );
    }

    const handleProductSubmit = (e) => { e.preventDefault(); if (!newProduct.name || !newProduct.hargaModal || !newProduct.images) return alert('Data produk tidak lengkap'); const p = { id: Date.now(), ...newProduct, hargaModal: parseInt(newProduct.hargaModal), images: newProduct.images.split(',') }; onAddProduct(p); setNewProduct({ name: '', description: '', hargaModal: '', images: '' }); alert('Produk ditambahkan!'); };
    const handlePromoSubmit = (e) => { e.preventDefault(); if (!newPromoUrl.trim()) return alert('URL Promo kosong'); onAddPromo({ id: Date.now(), imageUrl: newPromoUrl.trim() }); setNewPromoUrl(''); alert('Promo ditambahkan!'); };
    const renderStatusLabel = (status) => { const s = { 'Proses': 'yellow', 'Pengiriman': 'blue', 'Terkirim': 'green', 'Lunas': 'grey' }; return <span className={`ui ${s[status] || ''} label`}>{status}</span>; };
    
    const menuItems = [ { name: 'order', text: 'Order', icon: 'inbox' }, { name: 'produk', text: 'Produk & Promo', icon: 'box' }, { name: 'tagihan', text: 'Tagihan', icon: 'file invoice dollar' }, { name: 'data_konsumen', text: 'Data Konsumen', icon: 'users' }, { name: 'profil', text: 'Profil', icon: 'user' } ];

    const renderContent = () => {
        switch (activeItem) {
            case 'order':
                return (
                    <div>
                        <h3 className="ui dividing header">Manajemen Pesanan</h3>
                        <div className="ui relaxed divided list">
                            {orders && orders.map(order => {
                                const consumerProfile = consumers && consumers.find(c => c.email === order.consumerEmail);
                                const salesName = consumerProfile ? consumerProfile.namaSales : 'N/A';
                                return (
                                    <div className="item" key={order.id}>
                                        <div className="right floated content" style={{display: 'flex', alignItems: 'center'}}>
                                            {order.status === 'Proses' && <button className="ui small blue button" onClick={() => onUpdateOrderStatus(order.id, 'Pengiriman')}>Kirim</button>}
                                            {order.status === 'Pengiriman' && <button className="ui small teal button" onClick={() => onUpdateOrderStatus(order.id, 'Terkirim')}>Terkirim</button>}
                                            {order.status === 'Terkirim' && <AssignCollectorDropdown order={order} collectors={collectors} onAssignCollector={onAssignCollector} />}
                                        </div>
                                        <div className="content">
                                            <div className="header">{order.productName} ({order.id})</div>
                                            <div className="description">
                                                Pemesan: <strong>{consumerProfile ? consumerProfile.namaLengkap : order.consumerName}</strong> | Tenor: <strong>{order.tenor} hari</strong> | Sales: <strong>{salesName}</strong>
                                                <br/>
                                                Angsuran: <strong>Rp {order.installmentPrice.toLocaleString('id-ID')} / {order.paymentFrequency === 'mingguan' ? 'minggu' : 'hari'}</strong>
                                            </div>
                                            <div className="extra" style={{marginTop: '5px'}}>
                                                {order.date} - {renderStatusLabel(order.status)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'produk':
                return (
                    <div>
                        <h3 className="ui dividing header">Produk & Promo</h3>
                        <form className="ui form" onSubmit={handleProductSubmit}>
                            <div className="field"><label>Nama Barang</label><input type="text" name="name" value={newProduct.name} onChange={(e) => setNewProduct(p=>({...p, name: e.target.value}))} /></div>
                            <div className="field"><label>Deskripsi</label><textarea rows="2" name="description" value={newProduct.description} onChange={(e) => setNewProduct(p=>({...p, description: e.target.value}))}></textarea></div>
                            <div className="field"><label>Harga Modal</label><input type="number" name="hargaModal" value={newProduct.hargaModal} onChange={(e) => setNewProduct(p=>({...p, hargaModal: e.target.value}))} /></div>
                            <div className="field"><label>Foto (Pisahkan URL dgn koma)</label><textarea rows="2" name="images" value={newProduct.images} onChange={(e) => setNewProduct(p=>({...p, images: e.target.value}))}></textarea></div>
                            <button className="ui primary button" type="submit">Tambah Produk</button>
                        </form>
                        <h3 className="ui dividing header" style={{marginTop: '2em'}}>Tambah Promo</h3>
                        <form className="ui form" onSubmit={handlePromoSubmit}>
                            <div className="field"><label>URL Gambar Promo</label><input type="text" value={newPromoUrl} onChange={(e) => setNewPromoUrl(e.target.value)} /></div>
                            <button className="ui teal button" type="submit">Tambah Promo</button>
                        </form>
                    </div>
                );
            case 'tagihan':
                const activeBills = orders && orders.filter(o => o.status === 'Terkirim');
                const filteredBills = activeBills && activeBills.filter(bill =>
                    bill.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    bill.consumerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (bill.assignedCollector && bill.assignedCollector.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                return (
                    <div>
                        <h3 className="ui dividing header">Semua Tagihan Berjalan</h3>
                        <div className="ui fluid icon input" style={{marginBottom: '1em'}}>
                            <input type="text" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><i className="search icon"></i>
                        </div>
                        {filteredBills && filteredBills.length === 0 ? <p>Tidak ada tagihan aktif.</p> : (
                            <div className="ui selection relaxed divided list">
                                {filteredBills && filteredBills.map(bill => (
                                    <div className="item" key={bill.id} onClick={() => setViewingBill(bill)} style={{cursor: 'pointer'}}>
                                        <div className="right floated content"><i className="chevron right icon"></i></div>
                                        <div className="content">
                                            <div className="header">{bill.productName} ({bill.id})</div>
                                            <div className="description">Konsumen: {bill.consumerName} | Penagih: {bill.assignedCollector || 'Belum ditugaskan'}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'data_konsumen':
                return (
                    <div>
                        <h3 className="ui dividing header">Data Konsumen</h3>
                        {consumers && consumers.length === 0 ? <p>Belum ada data konsumen.</p> : (
                            <table className="ui celled table">
                                <thead><tr><th>Nama</th><th>Usaha</th><th>No. HP</th><th>Alamat Usaha</th><th>No. KTP</th><th>Status Tagihan</th></tr></thead>
                                <tbody>
                                    {consumers && consumers.map(c => {
                                        const hasActiveBill = orders && orders.some(o =>
                                            o.consumerEmail === c.email &&
                                            o.status !== 'Lunas'
                                        );
                                        return (
                                            <tr key={c.uid}>
                                                <td>{c.namaLengkap || c.email}</td>
                                                <td>{c.jenisUsaha}</td>
                                                <td>{c.noHape}</td>
                                                <td>{c.alamatUsaha}</td>
                                                <td>{c.nomorKtp}</td>
                                                <td>{hasActiveBill ? <span className="ui yellow label"><i className="sync alternate icon"></i>Berjalan</span> : <span className="ui green label"><i className="check circle icon"></i>Lunas</span>}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                );
            case 'profil':
                return (
                    <div>
                        <h3 className="ui dividing header">Profil Admin</h3>
                        <p>Nama: {user.email.split('@')[0]}</p>
                        <button className="ui fluid red button" style={{marginTop:'1rem'}} onClick={onLogout}>
                            <i className="sign out alternate icon"></i> Logout
                        </button>
                    </div>
                );
            default: return null;
        }
    };

    const Layout = ({children}) => (
        <div>
            <div className="ui top attached menu">
                <div className="item"><i className="cogs big icon"></i><b>Admin Dashboard</b></div>
            </div>
            {children}
        </div>
    );

    return (
        <React.Fragment>
            <Layout>
                {isMobile ? (
                    <div className="ui attached segment mobile-content-padding">{renderContent()}</div>
                ) : (
                    <div className="ui attached segment">
                        <div className="ui grid">
                            <div className="four wide column">
                                <div className="ui vertical fluid pointing menu">
                                    {menuItems.map(item => (
                                        <a key={item.name} className={activeItem === item.name ? 'active teal item' : 'item'} onClick={() => setActiveItem(item.name)}>
                                            <i className={`${item.icon} icon`}></i> {item.text}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="twelve wide stretched column">
                                <div className="ui segment">{renderContent()}</div>
                            </div>
                        </div>
                    </div>
                )}
                
                {isMobile && (
                    <div className="ui bottom fixed five item icon menu">
                        {menuItems.map(item => (<a key={item.name} className={activeItem === item.name ? 'active teal item' : 'item'} onClick={() => setActiveItem(item.name)}><i className={`${item.icon} icon`}></i><span style={{fontSize:'0.8em'}}>{item.text}</span></a>))}
                    </div>
                )}
            </Layout>
            {viewingBill && (
                <div className={`ui dimmer modals page transition visible active`} style={{display: 'flex !important', zIndex: 1001}}>
                    <div className={`ui standard modal transition visible active`}>
                        <i className="close icon" onClick={() => setViewingBill(null)}></i>
                        <div className="header">Detail Tagihan: {viewingBill.productName} ({viewingBill.id})</div>
                        <div className="content">
                            <p><strong>Konsumen:</strong> {viewingBill.consumerName}</p>
                            <p><strong>Penagih:</strong> {viewingBill.assignedCollector || 'Belum ada'}</p>
                            <p><strong>Angsuran:</strong> Rp {viewingBill.installmentPrice.toLocaleString('id-ID')} / {viewingBill.paymentFrequency === 'mingguan' ? 'minggu' : 'hari'}</p>
                            <div className="ui teal progress" data-value={viewingBill.payments.length} data-total={viewingBill.tenor}>
                                <div className="bar"><div className="progress"></div></div>
                                <div className="label">Terbayar {viewingBill.payments.length} dari {viewingBill.tenor} hari</div>
                            </div>
                            <h4 className="ui dividing header">Riwayat Pembayaran</h4>
                            {viewingBill.payments && viewingBill.payments.length === 0 ? <p>Belum ada pembayaran.</p> : (
                                <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                                    <table className="ui celled table">
                                        <thead><tr><th>Pembayaran Ke-</th><th>Tanggal</th></tr></thead>
                                        <tbody>
                                            {viewingBill.payments && viewingBill.payments.map((payment, index) => (
                                                <tr key={index}><td>{index + 1}</td><td>{payment.date}</td></tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        <div className="actions">
                            <button className="ui button" onClick={() => setViewingBill(null)}>Tutup</button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

// =================================== KOMPONEN: KOLEKTOR DASHBOARD ===================================
function KolektorDashboard({ user, onLogout, orders, onDailyPayment, consumers }) {
    const [activeItem, setActiveItem] = useState('tagihan');
    const size = useWindowSize();
    const isMobile = size.width < 768;

    const menuItems = [
        { name: 'tagihan', text: 'Daftar Tagihan', icon: 'list alternate outline' },
        { name: 'riwayat', text: 'Riwayat', icon: 'history' },
        { name: 'profil', text: 'Profil', icon: 'user' },
    ];

    const renderContent = () => {
        switch(activeItem) {
            case 'tagihan':
                const myActiveBills = orders && orders.filter(order =>
                    order.assignedCollectorUid === user.uid &&
                    order.status !== 'Lunas'
                );
                return (
                    <div>
                        <h3 className="ui dividing header">Daftar Tagihan Anda</h3>
                        {myActiveBills && myActiveBills.length === 0 ? <p>Tidak ada tagihan yang ditugaskan untuk Anda.</p> : (
                            <div className="ui cards">
                                {myActiveBills && myActiveBills.map(bill => {
                                    const consumerData = consumers && consumers.find(c => c.email === bill.consumerEmail);
                                    return (
                                        <div className="card" key={bill.id}>
                                            <div className="content">
                                                <div className="header">{bill.productName}</div>
                                                <div className="meta">ID Pesanan: {bill.id}</div>
                                                <div className="description">
                                                    <strong>Info Konsumen:</strong>
                                                    <div>{consumerData ? consumerData.namaLengkap : bill.consumerName}</div>
                                                    <div>{consumerData ? consumerData.alamatUsaha : 'N/A'}</div>
                                                    <div>{consumerData ? consumerData.noHape : 'N/A'}</div>
                                                </div>
                                                <div className="description" style={{ marginTop: '1em' }}>
                                                    <strong>Info Tagihan:</strong>
                                                    <div>Angsuran: Rp {bill.installmentPrice.toLocaleString('id-ID')} / {bill.paymentFrequency === 'mingguan' ? 'minggu' : 'hari'}</div>
                                                    <div>Terbayar: {bill.payments.length} dari {bill.tenor} hari</div>
                                                    {bill.status === 'Lunas' && (
                                                        <div style={{marginTop: '0.5em'}}>
                                                            <span className="ui green label"><i className="check icon"></i> Lunas</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {bill.status !== 'Lunas' ? (
                                                <div className="ui bottom attached green button" onClick={() => onDailyPayment(bill.id)}>
                                                    <i className="check icon"></i> Konfirmasi Bayar
                                                </div>
                                            ) : (
                                                <div className="ui bottom attached green button disabled">
                                                    <i className="check icon"></i> Lunas
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            case 'riwayat':
                const myPaymentHistory = orders && orders.flatMap(order => 
                    (order.payments || [])
                        .filter(p => p.collectedBy === user.name)
                        .map(p => ({ ...p, orderId: order.id, consumerName: order.consumerName }))
                ).reverse();
                return (
                    <div>
                        <h3 className="ui dividing header">Riwayat Penagihan Berhasil</h3>
                        {myPaymentHistory && myPaymentHistory.length === 0 ? <p>Anda belum memiliki riwayat penagihan.</p> : (
                            <div className="ui relaxed divided list">
                                {myPaymentHistory && myPaymentHistory.map((payment, index) => (
                                    <div className="item" key={index}>
                                        <i className="large money bill alternate middle aligned icon"></i>
                                        <div className="content">
                                            <div className="header">Order {payment.orderId}</div>
                                            <div className="description">
                                                Berhasil menagih dari <strong>{payment.consumerName}</strong> pada tanggal {payment.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'profil':
                return (
                    <div>
                        <h3 className="ui dividing header">Profil Kolektor</h3>
                        <p>Nama: {user.email.split('@')[0]}</p>
                        <button className="ui fluid red button" style={{marginTop:'1rem'}} onClick={onLogout}>
                            <i className="sign out alternate icon"></i> Logout
                        </button>
                    </div>
                );
            default: return null;
        }
    };

    const Layout = ({children}) => ( <div><div className="ui top attached menu"><div className="item"><i className="motorcycle big icon"></i><b>Kolektor Dashboard</b></div></div>{children}</div> );

    return (
        <Layout>
            {isMobile ? (
                <div className="ui attached segment mobile-content-padding">
                    {renderContent()}
                    <div className="ui bottom fixed three item icon menu">
                        {menuItems.map(item => (<a key={item.name} className={activeItem === item.name ? 'active teal item' : 'item'} onClick={() => setActiveItem(item.name)}><i className={`${item.icon} icon`}></i><span style={{fontSize:'0.8em'}}>{item.text}</span></a>))}
                    </div>
                </div>
            ) : (
                <div className="ui attached segment">
                    <div className="ui grid">
                        <div className="four wide column">
                            <div className="ui vertical fluid pointing menu">
                                {menuItems.map(item => (<a key={item.name} className={activeItem === item.name ? 'active teal item' : 'item'} onClick={() => setActiveItem(item.name)}><i className={`${item.icon} icon`}></i> {item.text}</a>))}
                            </div>
                        </div>
                        <div className="twelve wide stretched column"><div className="ui segment">{renderContent()}</div></div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

// =================================== KOMPONEN: KONSUMEN DASHBOARD ===================================

// Sub-komponen untuk Detail Produk (Page View)
function ProductDetailPage({ product, tenorOptions, onAddToCart, onGoBack }) {
    const [selectedTenor, setSelectedTenor] = useState(60);
    const [activeImage, setActiveImage] = useState(product.images ? product.images[0] : '');
    const [paymentFrequency, setPaymentFrequency] = useState('harian');

    let installmentPrice = 0;
    const currentOption = tenorOptions.find(opt => opt.days === selectedTenor);
    if (currentOption) {
        const hargaHarian = (product.hargaModal * currentOption.multiplier) / currentOption.days;
        installmentPrice = paymentFrequency === 'mingguan' ? Math.ceil(hargaHarian) * 6 : Math.ceil(hargaHarian);
    }

    return (
        <div className="ui segment" style={{marginTop: '1em', paddingBottom: '70px'}}> {/* Added padding-bottom for action bar */}
            <div className="detail-header" style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <i className="arrow left icon" style={{fontSize: '1.5rem', cursor: 'pointer', marginRight: '10px'}} onClick={onGoBack}></i>
                <h2 className="ui header" style={{margin: 0}}>Detail Produk</h2>
            </div>
            <img src={activeImage} className="ui fluid image" alt={product.name} />
            <div className="thumbnail-gallery" style={{display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap'}}>
                {product.images && product.images.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} className={`thumbnail ${imgUrl === activeImage ? 'active-thumbnail' : ''}`} onClick={() => setActiveImage(imgUrl)} alt={`Thumbnail ${index}`} />
                ))}
            </div>
            <h1 className="ui header" style={{marginTop:'1rem'}}>{product.name}</h1>
            <p>Harga Modal: <strong>Rp {product.hargaModal.toLocaleString('id-ID')}</strong></p>
            <div className="ui divider"></div>
            
            <div className="options-container">
                <strong>Tenor:</strong>
                <div className="tenor-options" style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    {tenorOptions.map(option => (
                        <button key={option.days} className={`ui button ${selectedTenor === option.days ? 'primary' : ''}`} onClick={() => setSelectedTenor(option.days)}>{option.days} hari</button>
                    ))}
                </div>
            </div>
            <div className="field">
                <label>Frekuensi Pembayaran</label>
                <div className="ui buttons">
                    <button className={`ui button ${paymentFrequency === 'harian' ? 'positive' : ''}`} onClick={() => setPaymentFrequency('harian')}>Harian</button>
                    <button className={`ui button ${paymentFrequency === 'mingguan' ? 'positive' : ''}`} onClick={() => setPaymentFrequency('mingguan')}>Mingguan (6 hari)</button>
                </div>
            </div>
            <div className="ui large green message" style={{marginTop: '15px'}}>
                <div className="header">Angsuran Anda</div>
                <p style={{fontSize: '1.5em', fontWeight: 'bold'}}>
                    Rp {installmentPrice.toLocaleString('id-ID')} / {paymentFrequency === 'mingguan' ? 'minggu' : 'hari'}
                </p>
            </div>
            <div className="ui divider"></div>
            <p>{product.description}</p>

            {/* Action Bar di bawah halaman */}
            <div className="action-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #ddd', padding: '10px', display: 'flex', zIndex: 1000, justifyContent: 'space-around' }}>
                <button className="ui teal button" onClick={() => onAddToCart({ product, tenor: selectedTenor, paymentFrequency, installmentPrice })}>
                    <i className="shopping basket icon"></i>+ Keranjang
                </button>
                <button className="ui primary button" onClick={() => {
                    // Simulate direct checkout - add to cart then go to checkout
                    onAddToCart({ product, tenor: selectedTenor, paymentFrequency, installmentPrice });
                    onGoBack('checkout'); // Go to checkout page after adding to cart
                }}>
                    Ajukan Item Ini
                </button>
            </div>
        </div>
    );
}

// Sub-komponen untuk In-Process Orders
function InProcessOrdersPage({ orders, onGoBack }) {
    const inProcess = orders.filter(order => order.status === 'Proses');
    return (
        <div className="ui segment" style={{marginTop: '1em'}}>
            <div className="detail-header" style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <i className="arrow left icon" style={{fontSize: '1.5rem', cursor: 'pointer', marginRight: '10px'}} onClick={onGoBack}></i>
                <h2 className="ui header" style={{margin: 0}}>Pesanan Diproses</h2>
            </div>
            {inProcess.length === 0 ? <p>Tidak ada pesanan yang sedang diproses.</p> : (
                <div className="ui segments">
                    {inProcess.map(item => (
                        <div className="ui segment" key={item.id}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <img src={item.product.images[0]} className="ui tiny image" style={{marginRight:'10px'}} alt={item.productName} />
                                <div>
                                    <strong>{item.productName}</strong>
                                    <p>Status: Menunggu Persetujuan Admin</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Sub-komponen untuk Shipped Orders
function ShippedOrdersPage({ orders, onGoBack, onConfirmReceipt }) {
    const shipped = orders.filter(order => order.status === 'Pengiriman');
    return (
        <div className="ui segment" style={{marginTop: '1em'}}>
            <div className="detail-header" style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <i className="arrow left icon" style={{fontSize: '1.5rem', cursor: 'pointer', marginRight: '10px'}} onClick={onGoBack}></i>
                <h2 className="ui header" style={{margin: 0}}>Pesanan Dikirim</h2>
            </div>
            {shipped.length === 0 ? <p>Tidak ada pesanan yang sedang dikirim.</p> : (
                <div className="ui segments">
                    {shipped.map(item => (
                        <div className="ui segment" key={item.id}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <img src={item.product.images[0]} className="ui tiny image" style={{marginRight:'10px'}} alt={item.productName} />
                                <div>
                                    <strong>{item.productName}</strong>
                                    <p>Pesanan Anda sedang dalam perjalanan.</p>
                                </div>
                            </div>
                            <button className="ui green fluid button" style={{marginTop:'1rem'}} onClick={() => onConfirmReceipt(item.id)}>Konfirmasi Penerimaan</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Sub-komponen untuk Active Installments
function ActiveInstallmentsPage({ orders, onGoBack }) {
    const activeInstallments = orders.filter(order => order.status === 'Terkirim'); // 'Terkirim' means received and now paying installments
    
    useEffect(() => {
        if ($('.ui.progress').length) {
            setTimeout(() => $('.ui.progress').progress(), 50);
        }
    }, [orders]);

    return (
        <div className="ui segment" style={{marginTop: '1em'}}>
            <div className="detail-header" style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <i className="arrow left icon" style={{fontSize: '1.5rem', cursor: 'pointer', marginRight: '10px'}} onClick={onGoBack}></i>
                <h2 className="ui header" style={{margin: 0}}>Pesanan Diterima & Tagihan Aktif</h2>
            </div>
            {activeInstallments.length === 0 ? <p>Tidak ada tagihan yang sedang berjalan.</p> : (
                <div className="ui segments">
                    {activeInstallments.map(item => {
                        const paidDays = item.payments ? item.payments.length : 0;
                        const progress = (paidDays / item.tenor) * 100;
                        return (
                            <div className="ui segment" key={item.id}>
                                <strong>{item.productName}</strong>
                                <p style={{fontSize:'0.9em',margin:'2px 0'}}>Tenor: {item.tenor} hari</p>
                                <div className="ui tiny progress success" data-percent={Math.round(progress)}>
                                    <div className="bar"></div>
                                </div>
                                <div className="label">Terbayar {paidDays} dari {item.tenor} hari</div>
                                <button className="ui blue fluid button" style={{marginTop:'10px'}} onClick={() => alert(`Simulasi: Kolektor akan menagih Rp ${item.installmentPrice.toLocaleString('id-ID')}`)}>Info Tagihan</button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


function KonsumenDashboard({ user, onLogout, products, orders, onNewOrder, promos, onSaveProfile }) {
    const [profileData, setProfileData] = useState(null);
    const [activeItem, setActiveItem] = useState('produk'); // Main navigation (produk, promo, profile)
    const [currentPage, setCurrentPage] = useState('main'); // For nested page views (main, productDetail, cart, inProcess, shipped, activeInstallments, editProfile)
    const [selectedProductForDetail, setSelectedProductForDetail] = useState(null); // For product detail page
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const size = useWindowSize();
    const isMobile = size.width < 768;
    
    const tenorOptions = [ { days: 60, multiplier: 1.20 }, { days: 90, multiplier: 1.25 }, { days: 120, multiplier: 1.30 }, { days: 150, multiplier: 1.35 }, { days: 180, multiplier: 1.40 } ];
    
    const userOrders = orders.filter(order => order.userId === user?.uid);
    const inProcessOrders = userOrders.filter(order => order.status === 'Proses');
    const shippedOrders = userOrders.filter(order => order.status === 'Pengiriman');
    const activeInstallments = userOrders.filter(order => order.status === 'Terkirim'); // 'Terkirim' means received and now paying installments

    // Update profileData when user prop changes
    useEffect(() => {
        if (user) {
            const initialProfileData = {
                namaLengkap: user.namaLengkap || user.email || '',
                jenisUsaha: user.jenisUsaha || '',
                alamatRumah: user.alamatRumah || '', // Corrected typo
                alamatUsaha: user.alamatUsaha || '',
                noHape: user.noHape || '',
                nomorKtp: user.nomorKtp || '',
                namaSales: user.namaSales || ''
            };
            setProfileData(initialProfileData);
        } else {
            setProfileData(null);
        }
    }, [user]);

    // Handle initial load of progress bars and re-load on order changes
    useEffect(() => {
        if ($('.ui.progress').length) {
            setTimeout(() => $('.ui.progress').progress(), 50);
        }
    }, [orders, currentPage]); // Re-run if orders or current page changes

    // Redirect to ProfileForm if profile data is incomplete
    if (profileData && (!profileData.namaLengkap || !profileData.noHape || !profileData.nomorKtp)) {
        return <ProfileForm onSave={(data) => { setProfileData(data); onSaveProfile(data); }} user={user} />;
    }

    const handleProductClick = (product) => {
        setSelectedProductForDetail(product);
        setCurrentPage('productDetail');
    };

    const handleAddToCart = (itemToAdd) => {
        setCartItems(prevItems => [...prevItems, { ...itemToAdd, cartId: Date.now() }]);
        alert(`${itemToAdd.product.name} ditambahkan ke keranjang.`);
    };

    const handleRemoveFromCart = (cartId) => { setCartItems(cartItems.filter(item => item.cartId !== cartId)); };
    
    const handleCheckout = () => {
        if (cartItems.length === 0) return alert('Keranjang kosong!');
        const newOrdersToProcess = cartItems.map(item => ({ 
            id: `#${Date.now().toString().slice(-5) + Math.floor(Math.random()*100)}`, // Generate a unique short ID
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 
            productName: item.product.name, 
            product: item.product, // Keep full product info for display
            tenor: item.tenor, 
            installmentPrice: item.installmentPrice, 
            paymentFrequency: item.paymentFrequency, 
            status: 'Proses', // Initial status
            payments: [], 
            assignedCollector: null,
            assignedCollectorUid: null,
            userId:user.uid,
            consumerName: user.namaLengkap || user.email,
            consumerEmail: user.email
        }));
        onNewOrder(newOrdersToProcess); // Send multiple orders to App component
        setCartItems([]); // Clear cart
        alert('Pesanan berhasil dibuat dan sedang diproses.');
        setCurrentPage('main'); // Go back to main product page or profile
        setActiveItem('order'); // Auto-switch to order history view for confirmation
    };

    const handleConfirmReceipt = (orderId) => {
        // Find the order in shippedOrders by its ID to get its firebaseDocId
        const orderToConfirm = shippedOrders.find(o => o.id === orderId);
        if (orderToConfirm) {
            // Update its status in Firestore
            // Assuming onUpdateOrderStatus handles finding the order by its 'id' and updating its 'firebaseDocId'
            onUpdateOrderStatus(orderToConfirm.id, 'Terkirim'); // Change status to Terkirim (Received)
            alert(`Pesanan ${orderToConfirm.productName} telah Anda terima.`);
        } else {
            alert('Pesanan tidak ditemukan atau belum dikirim.');
        }
        setCurrentPage('profileMain'); // Go back to profile to refresh order status
    };

    const handleGoBack = (targetPage = 'main') => {
        if (targetPage === 'profileMain') {
            setCurrentPage('main');
            setActiveItem('profile'); // Switch to profile tab
        } else if (targetPage === 'checkout') {
            setCurrentPage('main'); // Stay on main if added to cart, then go to checkout
            setActiveItem('keranjang');
        }
        else {
            setCurrentPage('main'); // Default: back to main content (produk listing)
        }
    };
    
    // Filter products for main display based on search term
    const filteredProducts = products && products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Component for displaying promos as full-width cards
    const PromoDisplay = ({ promos, products, onProductClick }) => {
        const promoProducts = promos.map(promo => {
            const product = products.find(p => p.id === promo.productId);
            const imageUrl = promo.imageUrl || (product && product.images && product.images[0]);
            return product ? { ...product, promoTitle: promo.title, promoImageUrl: imageUrl } : null;
        }).filter(Boolean);

        if (!promoProducts || promoProducts.length === 0) return <p>Tidak ada promo spesial saat ini.</p>;

        return (
            <div className="promo-cards-container" style={{ marginBottom: '2em' }}>
                {promoProducts.map(product => {
                    const defaultTenorOption = tenorOptions.find(opt => opt.days === 60);
                    const hargaHarian = defaultTenorOption ? (product.hargaModal * defaultTenorOption.multiplier) / defaultTenorOption.days : 0;

                    return (
                        <div className="ui card fluid promo-full-card" key={product.id} onClick={() => onProductClick(product)}>
                            <div className="image">
                                <img src={product.promoImageUrl || product.images[0]} alt={product.name} />
                            </div>
                            <div className="content">
                                <div className="header">{product.name}</div>
                                <div className="meta">
                                    <span className="date">{product.promoTitle || 'Promo Spesial'}</span>
                                </div>
                                <div className="description">
                                    Mulai dari **Rp {Math.ceil(hargaHarian).toLocaleString('id-ID')} / hari**
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderStatusLabel = (status) => {
        const s = { 'Proses': 'yellow', 'Pengiriman': 'blue', 'Terkirim': 'green', 'Lunas': 'grey' };
        const i = { 'Proses': 'sync alternate', 'Pengiriman': 'shipping fast', 'Terkirim': 'check circle', 'Lunas': 'flag checkered' };
        return <span className={`ui ${s[status] || ''} label`}><i className={`${i[status] || 'info'} icon`}></i>{status}</span>;
    };
    
    // Main content renderer based on activeItem (produk, promo, profile)
    const renderMainContent = () => {
        switch(activeItem) {
            case 'produk':
                return (
                    <div>
                        <div className="ui segment" style={{padding:'10px', marginTop:'1em'}}> {/* Carousel here */}
                            <div className="image-carousel">
                                <div><img className="carousel-image" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800" alt="Banner 1" /></div>
                                <div><img className="carousel-image" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Banner 2" /></div>
                                <div><img className="carousel-image" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" alt="Banner 3" /></div>
                            </div>
                        </div>
                        <div className="ui top attached segment" style={{margin:'1rem 0'}}>
                            <div className="ui dropdown">
                                <div className="text">Urutkan</div><i className="dropdown icon"></i>
                                <div className="menu"><div className="item">Terkait</div></div>
                            </div>
                        </div>
                        <h2 className="ui header"><i className="shopping bag icon"></i>Etalase Produk</h2>
                        {filteredProducts && filteredProducts.length === 0 ? <p>Tidak ada produk ditemukan.</p> : (
                            <div className={`ui ${isMobile ? 'one' : 'three'} doubling cards`}>
                                {filteredProducts.map(product => (
                                    <div className="card" key={product.id} onClick={() => handleProductClick(product)} style={{cursor: 'pointer'}}>
                                        <div className="image"><img src={product.images[0]} alt={product.name} /></div>
                                        <div className="content">
                                            <div className="header">{product.name}</div>
                                            <div className="meta"><span className="ui teal label">Lihat Opsi Angsuran</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{clear:'both',paddingTop:'2rem'}}><h3 className="ui header">Rekomendasi</h3><div className="recommendation-carousel"></div></div>
                    </div>
                );
            case 'promo':
                return (
                    <div>
                        <h2 className="ui header"><i className="tags icon"></i>Promo Spesial</h2>
                        <PromoDisplay promos={promos} products={products} onProductClick={handleProductClick} />
                    </div>
                );
            case 'keranjang': // Cart page accessible via bottom nav for mobile or cart icon
                return (
                    <div>
                        <h2 className="ui header"><i className="cart icon"></i>Keranjang</h2>
                        {cartItems.length === 0 ? <p>Keranjang kosong.</p> : (
                            <div>
                                <div className="ui relaxed divided list">
                                    {cartItems.map(item => (
                                        <div className="item" key={item.cartId}>
                                            <div className="right floated content">
                                                <button className="ui mini red icon button" onClick={() => handleRemoveFromCart(item.cartId)}><i className="trash icon"></i></button>
                                            </div>
                                            <img className="ui avatar image" src={item.product.images[0]} alt={item.product.name} />
                                            <div className="content">
                                                <a className="header">{item.product.name}</a>
                                                <div className="description">Tenor {item.tenor} hari @ Rp {item.installmentPrice.toLocaleString('id-ID')}/{item.paymentFrequency === 'mingguan' ? 'minggu' : 'hari'}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="ui fluid primary button" onClick={handleCheckout}>Checkout</button>
                            </div>
                        )}
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h2 className="ui header"><i className="user circle icon"></i>Profil Saya</h2>
                        <div className="ui segment">
                            <div className="ui relaxed list">
                                <div className="item"><i className="address card icon"></i><div className="content"><div className="header">NIK KTP</div><div id="profile-nik-ktp">{profileData.nomorKtp}</div></div></div>
                                <div className="item"><i className="user icon"></i><div className="content"><div className="header">Nama</div><div id="profile-nama">{profileData.namaLengkap}</div></div></div>
                                <div className="item"><i className="phone icon"></i><div className="content"><div className="header">No Handphone</div><div id="profile-nohp">{profileData.noHape}</div></div></div>
                                <div className="item"><i className="building icon"></i><div className="content"><div className="header">Alamat Usaha</div><div id="profile-alamat-usaha">{profileData.alamatUsaha}</div></div></div>
                                <div className="item"><i className="home icon"></i><div className="content"><div className="header">Alamat Rumah</div><div id="profile-alamat-rumah">{profileData.alamatRumah}</div></div></div>
                                <div className="item"><i className="briefcase icon"></i><div className="content"><div className="header">Jenis Usaha</div><div id="profile-jenis-usaha">{profileData.jenisUsaha}</div></div></div>
                                <div className="item"><i className="handshake icon"></i><div className="content"><div className="header">Nama Sales</div><div id="profile-nama-sales">{profileData.namaSales}</div></div></div>
                            </div>
                            <button className="ui primary button" style={{marginTop: '1em'}} onClick={() => setCurrentPage('editProfile')}>Edit Profil</button>
                        </div>
                        <h3 className="ui header">Status Pesanan Saya</h3>
                        <div className="ui segment">
                            <div className="ui three column grid order-status-grid">
                                <div className="column" onClick={() => setCurrentPage('inProcessOrders')} style={{cursor: 'pointer'}}>
                                    <div className="process-icon-container" style={{position:'relative'}}>
                                        <i className="huge box icon"></i>
                                        {inProcessOrders.length > 0 && <div className="ui red circular label status-label">{inProcessOrders.length}</div>}
                                    </div>
                                    <p>Proses</p>
                                </div>
                                <div className="column" onClick={() => setCurrentPage('shippedOrders')} style={{cursor: 'pointer'}}>
                                    <div className="shipped-icon-container" style={{position:'relative'}}>
                                        <i className="huge shipping fast icon"></i>
                                        {shippedOrders.length > 0 && <div className="ui red circular label status-label">{shippedOrders.length}</div>}
                                    </div>
                                    <p>Dikirim</p>
                                </div>
                                <div className="column" onClick={() => setCurrentPage('activeInstallments')} style={{cursor: 'pointer'}}>
                                    <div className="received-icon-container" style={{position:'relative'}}>
                                        <i className="huge check circle outline icon"></i>
                                        {activeInstallments.length > 0 && <div className="ui red circular label status-label">{activeInstallments.length}</div>}
                                    </div>
                                    <p>Diterima</p>
                                </div>
                            </div>
                        </div>
                        <h3 className="ui header">Tagihan Berjalan</h3>
                        <div id="ongoing-bills-summary" onClick={() => setCurrentPage('activeInstallments')} style={{cursor: 'pointer'}}>
                            {activeInstallments.length === 0 ? <div className="ui segment"><p>Tidak ada tagihan aktif.</p></div> : (
                                <div className="ui segments">
                                    {activeInstallments.map(item => (
                                        <div className="ui segment" key={item.id}>
                                            <strong>{item.productName}</strong><br/>
                                            <small>Cicilan: Rp {item.installmentPrice.toLocaleString('id-ID')} / hari</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="ui fluid red button" style={{marginTop:'1rem'}} onClick={onLogout}>
                            <i className="sign out alternate icon"></i> Logout
                        </button>
                    </div>
                );
            default: return <div>Pilih menu</div>;
        }
    };
    
    // Navigation items for the bottom fixed menu
    const menuItems = [
        { name: 'produk', icon: 'shop', text: 'Produk' },
        { name: 'promo', icon: 'tags', text: 'Promo' },
        { name: 'profile', icon: 'user circle', text: 'Profil' }
    ];
    
    const Layout = ({children}) => ( 
        <div>
            {/* Top Bar for Search and Cart Icon */}
            <div className="top-bar" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '0 1rem', marginBottom: '1rem' }}>
                <div className="ui fluid icon input search-input-container" style={{flexGrow: '1'}}>
                    <input type="text" placeholder="Cari produk seperti 'TV LED' atau 'Kulkas'" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <i className="search icon"></i>
                </div>
                <a className="cart-icon-container" onClick={() => setActiveItem('keranjang')}> {/* Cart icon in header leads to cart page */}
                    <i className="shopping cart icon cart-icon"></i>
                    {cartItems.length > 0 && <div className="ui red circular label" style={{position:'absolute', top:'-5px', right:'-8px'}}>{cartItems.length}</div>}
                </a>
            </div>
            {children}
        </div> 
    );
    
    // Main render logic for KonsumenDashboard
    return (
        <React.Fragment>
            <Layout>
                {/* Render specific pages based on currentPage state */}
                {currentPage === 'main' && (
                    <div className="ui attached segment mobile-content-padding">
                        {renderMainContent()}
                        <div className="ui bottom fixed three item icon menu"> {/* Only 3 items: Produk, Promo, Profil */}
                            {menuItems.map(item => (
                                <a key={item.name} className={activeItem === item.name ? 'active teal item' : 'item'} onClick={() => {
                                    setActiveItem(item.name);
                                    setCurrentPage('main'); // Ensure we are on main page content
                                }}><i className={`${item.icon} icon`}></i><span style={{fontSize: '0.8em'}}>{item.text}</span></a>
                            ))}
                        </div>
                    </div>
                )}
                {currentPage === 'productDetail' && selectedProductForDetail && (
                    <ProductDetailPage 
                        product={selectedProductForDetail} 
                        tenorOptions={tenorOptions}
                        onAddToCart={handleAddToCart}
                        onGoBack={handleGoBack}
                    />
                )}
                {currentPage === 'keranjang' && ( // Direct access to cart page
                    renderMainContent() // Render cart content
                )}
                {currentPage === 'inProcessOrders' && (
                    <InProcessOrdersPage 
                        orders={inProcessOrders} 
                        onGoBack={() => handleGoBack('profileMain')} 
                    />
                )}
                 {currentPage === 'shippedOrders' && (
                    <ShippedOrdersPage 
                        orders={shippedOrders} 
                        onGoBack={() => handleGoBack('profileMain')} 
                        onConfirmReceipt={handleConfirmReceipt}
                    />
                )}
                {currentPage === 'activeInstallments' && (
                    <ActiveInstallmentsPage 
                        orders={activeInstallments} 
                        onGoBack={() => handleGoBack('profileMain')} 
                    />
                )}
                {currentPage === 'editProfile' && (
                    <ProfileForm 
                        onSave={(data) => { 
                            setProfileData(data); 
                            onSaveProfile(data); 
                            setCurrentPage('main'); // Back to main profile view
                            setActiveItem('profile');
                        }} 
                        user={user} 
                    />
                )}
            </Layout>
        </React.Fragment>
    );
}


// =================================== KOMPONEN APP UTAMA ===================================
function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCxJsjO39UnnEBzJ_OrUb_kH2InwNRDTdU",
        authDomain: "ecomercee-28797.firebaseapp.com",
        projectId: "ecomercee-28797",
        storageBucket: "ecomercee-28797.appspot.com",
        messagingSenderId: "53572493438",
        appId: "1:53572493438:web:23608b2d75f81f7e70b82f",
        measurementId: "G-HBB9YRHLBN"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    const [user, setUser] = useState(null); // User state is now null initially
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(mockProducts); // Use mock data initially
    const [orders, setOrders] = useState([]);
    const [promos, setPromos] = useState(mockPromos); // Use mock data initially
    const [collectors, setCollectors] = useState([]);
    const [consumers, setConsumers] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userDocRef = db.collection('users').doc(authUser.uid);
                const userDoc = await userDocRef.get();
                if (userDoc.exists) {
                    setUser({ uid: authUser.uid, email: authUser.email, ...userDoc.data() });
                } else {
                    // Auto-create basic profile if authenticated user has no Firestore doc
                    await db.collection('users').doc(authUser.uid).set({
                        email: authUser.email,
                        role: 'konsumen', // Default role for new Firebase users
                        namaLengkap: authUser.email.split('@')[0], // Basic name from email
                        noHape: '', alamatRumah: '', alamatUsaha: '', jenisUsaha: '', namaSales: '', nomorKtp: ''
                    });
                    const newUserDoc = await userDocRef.get();
                    setUser({ uid: authUser.uid, email: authUser.email, ...newUserDoc.data() });
                }
            } else {
                setUser(null); // User is genuinely logged out or not authenticated
            }
            setLoading(false);
        });

        // Fetch actual data from Firestore, with fallback to mock data if empty or error
        const unsubscribeProducts = db.collection('products').onSnapshot(snapshot => {
            const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(fetchedProducts.length > 0 ? fetchedProducts : mockProducts); 
        }, error => {
            console.error("Error fetching products from Firestore: ", error);
            setProducts(mockProducts); 
        });

        const unsubscribeOrders = db.collection('orders').onSnapshot(snapshot => {
            const fetchedOrders = snapshot.docs.map(doc => ({ firebaseDocId: doc.id, ...doc.data() }));
            setOrders(fetchedOrders);
        }, error => console.error("Error fetching orders: ", error));

        const unsubscribePromos = db.collection('promos').onSnapshot(snapshot => {
            const fetchedPromos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPromos(fetchedPromos.length > 0 ? fetchedPromos : mockPromos); 
        }, error => {
            console.error("Error fetching promos from Firestore: ", error);
            setPromos(mockPromos); 
        });

        const unsubscribeCollectors = db.collection('users').where('role', '==', 'kolektor').onSnapshot(snapshot => {
            const fetchedCollectors = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            setCollectors(fetchedCollectors);
        }, error => console.error("Error fetching collectors: ", error));

        const unsubscribeConsumers = db.collection('users').where('role', '==', 'konsumen').onSnapshot(snapshot => {
            const fetchedConsumers = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            setConsumers(fetchedConsumers);
        }, error => console.error("Error fetching consumers: ", error));

        return () => {
            unsubscribeAuth();
            unsubscribeProducts();
            unsubscribeOrders();
            unsubscribePromos();
            unsubscribeCollectors();
            unsubscribeConsumers();
        };
    }, []);

    const handleRegister = async (email, password) => {
        try {
            const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(authUser.uid).set({
                email: email,
                role: 'konsumen',
                namaLengkap: authUser.email.split('@')[0],
                noHape: '', alamatRumah: '', alamatUsaha: '', jenisUsaha: '', namaSales: '', nomorKtp: ''
            });
            alert('Registrasi berhasil!');
        } catch (error) { alert(`Registrasi Gagal: ${error.message}`); console.error("Register Error:", error); }
    };

    const handleLogin = async (email, password) => {
        try { await auth.signInWithEmailAndPassword(email, password); } catch (error) { alert(`Login Gagal: ${error.message}`); console.error("Login Error:", error); }
    };
    
    const handleLogout = () => auth.signOut();
    
    const handleAddProduct = async (productData) => {
        try {
            await db.collection('products').add(productData);
            alert("Produk berhasil ditambahkan!");
        } catch (error) { console.error("Error adding product: ", error); alert("Gagal menambahkan produk."); }
    };

    const handleAddPromo = async (promoData) => {
        try {
            await db.collection('promos').add(promoData);
            alert("Promo berhasil ditambahkan!");
        } catch (error) { console.error("Error adding promo: ", error); alert("Gagal menambahkan promo."); }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderDocQuery = db.collection('orders').where('id', '==', orderId).limit(1);
            const snapshot = await orderDocQuery.get();

            if (!snapshot.empty) {
                const docId = snapshot.docs[0].id;
                await db.collection('orders').doc(docId).update({ status: newStatus });
                alert("Status order berhasil diperbarui!");
            } else {
                alert("Order tidak ditemukan!");
            }
        } catch (error) { console.error("Error updating order status: ", error); alert("Gagal memperbarui status order."); }
    }

    const handleAssignCollector = async (orderId, collectorName, collectorUid) => {
        try {
            const orderDocQuery = db.collection('orders').where('id', '==', orderId).limit(1);
            const snapshot = await orderDocQuery.get();

            if (!snapshot.empty) {
                const docId = snapshot.docs[0].id;
                await db.collection('orders').doc(docId).update({ 
                    assignedCollector: collectorName, 
                    assignedCollectorUid: collectorUid
                });
                alert("Kolektor berhasil ditugaskan!");
            } else {
                alert("Order tidak ditemukan!");
            }
        } catch (error) { 
            console.error("Error assigning collector: ", error); 
            alert("Gagal menugaskan kolektor."); 
        }
    };

    const handleNewOrder = async (newOrdersArray) => {
        try {
            const batch = db.batch();
            newOrdersArray.forEach(order => {
                const docRef = db.collection('orders').doc();
                batch.set(docRef, {
                    ...order,
                    consumerName: user.namaLengkap || user.email,
                    consumerEmail: user.email,
                    userId: user.uid
                });
            });
            await batch.commit();
            alert('Pesanan berhasil dibuat!');
        } catch (error) {
            console.error("Error creating new order: ", error);
            alert("Gagal membuat pesanan baru.");
        }
    };

    const handleDailyPayment = async (orderId) => {
        try {
            const orderDocQuery = db.collection('orders').where('id', '==', orderId).limit(1);
            const snapshot = await orderDocQuery.get();

            if (!snapshot.empty) {
                const docRef = snapshot.docs[0].ref;
                const currentOrderData = snapshot.docs[0].data();
                const currentPayments = currentOrderData.payments || [];
                const tenor = parseInt(currentOrderData.tenor); 

                if (currentPayments.length >= tenor) {
                    alert("Tagihan ini sudah lunas!");
                    return;
                }

                const newPayment = {
                    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                    collectedBy: user.name || user.email
                };

                const updatedPayments = [...currentPayments, newPayment];
                let newStatus = currentOrderData.status;

                if (updatedPayments.length >= tenor) {
                    newStatus = 'Lunas';
                }

                await docRef.update({
                    payments: updatedPayments,
                    status: newStatus
                });

                alert('Pembayaran berhasil dicatat!' + (newStatus === 'Lunas' ? ' Dan tagihan sudah Lunas!' : ''));

            } else {
                alert("Order tidak ditemukan untuk mencatat pembayaran!");
            }
        } catch (error) {
            console.error("Error logging daily payment: ", error);
            alert("Gagal mencatat pembayaran.");
        }
    };

    const handleSaveProfile = async (profileData) => {
        try {
            await db.collection('users').doc(user.uid).update(profileData);
            setUser(prevUser => ({ ...prevUser, ...profileData }));
            alert('Profil berhasil diperbarui!');
        } catch (error) {
            console.error("Error saving profile: ", error);
            alert("Gagal menyimpan profil.");
        }
    };


    if (loading) { return <div className="ui active inverted dimmer"><div className="ui text loader">Loading...</div></div>; }

    // Render based on user status
    if (!user) { // If no user is logged in
        return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
    }
    
    // If user is logged in, render dashboard based on role
    switch (user.role) {
        case 'admin':
            return (
                <AdminDashboard
                    key={user.uid}
                    user={user}
                    onLogout={handleLogout}
                    products={products}
                    orders={orders}
                    promos={promos}
                    collectors={collectors}
                    consumers={consumers}
                    onAddProduct={handleAddProduct}
                    onAddPromo={handleAddPromo}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                    onAssignCollector={handleAssignCollector}
                />
            );
        case 'kolektor':
            return (
                <KolektorDashboard
                    key={user.uid}
                    user={user}
                    onLogout={handleLogout}
                    orders={orders}
                    consumers={consumers}
                    onDailyPayment={handleDailyPayment}
                />
            );
        case 'konsumen':
            return (
                <KonsumenDashboard
                    key={user.uid}
                    user={user}
                    onLogout={handleLogout}
                    products={products}
                    orders={orders}
                    promos={promos}
                    onNewOrder={handleNewOrder}
                    onSaveProfile={handleSaveProfile}
                    onUpdateOrderStatus={handleUpdateOrderStatus} // Pass this down for confirm receipt
                />
            );
        default:
            return (
                <div>
                    <h1>Peran tidak dikenal: "{user.role}"</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            );
    }
}
        
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

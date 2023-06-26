using System.Windows;
using System.Windows.Shapes;
using System.IO;
using System;
using System.Text;

namespace Calculator
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
		public MainWindow()
		{
			InitializeComponent();
		}

		private async void wv_Initialized(object sender, EventArgs e)
		{
			await webView.EnsureCoreWebView2Async(null);
			webView.CoreWebView2.Navigate(Environment.CurrentDirectory + "\\index.html");
		}
	}
}
